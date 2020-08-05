import * as msal from "@azure/msal-browser";
import axios from "axios";

const msalConfig = {
  graphEndpoints: {
    graphUserEndpoint: 'https://graph.microsoft.com/User.Read'
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

function loginBackend() {
  const accountInfo = app.getAccountByUsername(username);
  axios
    .post(process.env.VUE_APP_URL + "login", {
      accountID: accountInfo.homeAccountId,
      email: accountInfo.username,
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
      console.log("test");
      app.loginPopup(loginRequest).then(() => {
        this.username = app.getAllAccounts()[0].username; //Upon succesful login, there should only ever be one account logged in.
        this.$store.commit(
          "setAccount",
          app.getAccountByUsername(this.username)
        );
        this.$store.commit("setAuthenticationStatus", true); //Upon succesful sign-in set authentication status to true.
      });
    },
    $checkAuthenticationStatus() {
      const currentAccounts = app.getAllAccounts();

      return new Promise((resolve, reject) => {
        if (currentAccounts === null) {
          console.log("No accounts signed in");
          this.$store.commit("setAuthenticationStatus", false);
          reject();
        } else if (currentAccounts.length > 1) {
          //More than one account signed in currently
          for (var account in currentAccounts) {
            if (
              currentAccounts[account].tenantId == process.env.VUE_APP_TENANT_ID
            ) {
              loginBackend();
              this.$store.commit("setAuthenticationStatus", true);
              this.$store.commit("setAccount", currentAccounts[account]);
              resolve(true);
            }
          }
          console.log(currentAccounts);
        } else if (currentAccounts.length === 1) {
          //Exactly one account signed in.
          username = currentAccounts[0].username;
          console.log("One account logged in", currentAccounts);
          if (currentAccounts[0].tenantId == process.env.VUE_APP_TENANT_ID) {
            loginBackend();
            this.$store.commit("setAuthenticationStatus", true);
            resolve(true);
          }
        }
        console.log(username);
      });
    },
    $getAccountID() {
      return app.getAccountByUsername(username).homeAccountId;
    },
    $getAccountGraph(accountValue) {
      getGraphToken(accountValue).then((response) => {
        const headers = new Headers({ Authorization: `Bearer ${response.accessToken}`})
        const options = {headers}
        axios.get(msalConfig.graphEndpoints.graphUserEndpoint, options)
        .then((graphResponse) => {
          console.log(graphResponse)
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
