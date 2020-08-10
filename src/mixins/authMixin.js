import * as msal from "@azure/msal-browser";
import axios from "axios";

const msalConfig = {
  graphEndpoints: {
    graphUserEndpoint: 'https://graph.microsoft.com/v1.0/me'
  },
  authConfig: {
    auth: {
      clientId: process.env.VUE_APP_CLIENT_ID,
      authority: `https://login.microsoftonline.com/${process.env.VUE_APP_TENANT_ID}`,
      redirectUri: process.env.VUE_APP_BASE_URL,
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: false, // Set this to true in the case of issues with Internet Explorer.
    },
  },
};

const loginRequest = {
  scopes: ["User.Read"],
};

var username = "";

const app = new msal.PublicClientApplication(msalConfig.authConfig);

//Check authentication and update the isAuthenticated value in the vuex store.

function loginBackend(account) {
  axios
    .post(process.env.VUE_APP_URL + "login", {
      accountID: account.homeAccountId,
      email: account.username,
    })
    .catch((err) => {
      console.log(err);
    });
}

function getGraphToken(accountValue) {
  loginRequest.account = accountValue;
  return app
    .acquireTokenSilent(loginRequest)
    .then((accessToken) => {
      return accessToken;
    })
    .catch((error) => {
      console.log(
        "Error in acquiring the access token silently. Acquiring via popup instead",
        error
      );

      return app
        .acquireTokenPopup(this.loginRequest)
        .then((accessToken) => {
          return accessToken;
        })
        .catch((error) => {
          console.log("Error in acquiring the access token via popup.", error);
        });
    });
}

export const authMixin = {
  data() {
    return {
      authenticated: false,
    };
  },
  methods: {
    $signIn() {
      console.log('Signing in')
      app.loginPopup(loginRequest).then(() => {
        const account = app.getAllAccounts()[0];
        this.username = account.username; //Upon succesful login, there should only ever be one account logged in.
        this.$store.commit(
          "setAccount",
          account
        );
        this.$store.commit("setAuthenticationStatus", true); //Upon succesful sign-in set authentication status to true.
      });
    },
    $checkAuthenticationStatus(accountValue) {
      loginRequest.account = accountValue;
      console.log(`Account: ${accountValue}`)



      const currentAccounts = app.getAllAccounts();

      return new Promise((resolve, reject) => {
        if (currentAccounts.length === 0) {
          console.log("No accounts signed in");
          this.$store.commit("setAuthenticationStatus", false);
          reject();
        } else if (currentAccounts.length > 1) {
          //More than one account signed in currently
          for (var account in currentAccounts) {
            if (
              currentAccounts[account].tenantId == process.env.VUE_APP_TENANT_ID
            ) {
              this.getGraphToken(currentAccounts[account]) //Attempt getting a graph token to truly make sure that the user is authenticated.
                .then(() => {
                  loginBackend(currentAccounts[account]);
                  this.$store.commit("setAuthenticationStatus", true);
                  this.$store.commit("setAccount", currentAccounts[account]);
                  resolve(true);
                })
                .catch(() => {
                  console.log('Failed Authenticaton')
                  reject();
                })
            }
          }
          console.log(currentAccounts);
        } else if (currentAccounts.length === 1) {
          //Exactly one account signed in.
          username = currentAccounts[0].username;
          console.log("One account logged in");
          if (currentAccounts[0].tenantId == process.env.VUE_APP_TENANT_ID) {
            this.getGraphToken(currentAccounts[0]) //Attempt getting a graph token to truly make sure that the user is authenticated.
              .then(() => {
                loginBackend(currentAccounts[0]);
                this.$store.commit("setAuthenticationStatus", true);
                this.$store.commit("setAccount", currentAccounts[0]);
                resolve(true);
              })
              .catch(() => {
                console.log('Failed Authenticaton')
                reject();
              })
          }
        }
      });
    },
    $getAccountID() {
      return app.getAccountByUsername(username).homeAccountId;
    },
    $getAccountGraph(accountValue) {
      return getGraphToken(accountValue).then((response) => {
        const options = {
          headers: {
            'Authorization': `Bearer ${response.accessToken}`
          }}

        return axios.get(msalConfig.graphEndpoints.graphUserEndpoint, options)
        .then((graphResponse) => {
          return graphResponse
        })
        .catch((error) => {
          console.log(error)
        })
      });
    },
    $signOut() {
      this.$store.commit("setAuthenticationStatus", false);
      app.logout({
        //TODO: Add the specific account here
      });
    },
  },
};
