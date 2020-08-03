import * as msal from "@azure/msal-browser";
import axios from 'axios';

const msalConfig = {
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
};

const loginRequest = {
  scopes: ["User.Read"],
};

var username = "";

const app = new msal.PublicClientApplication(msalConfig);

//Check authentication and update the isAuthenticated value in the vuex store.

function loginBackend() {
  const accountInfo = app.getAccountByUsername(username);
  axios.post(process.env.VUE_APP_URL + 'login', {
    accountID: accountInfo.homeAccountId,
    email: accountInfo.username
  })
  .catch((err) => {
    console.log(err)
  })
}

export const authMixin = {
  data() {
    return {
      msalClient: null,
      authenticated: false,
    };
  },
  methods: {
    created() {
      this.msalClient = app;
    },
    $signIn() {
      console.log("test");
      app.loginPopup(loginRequest).then(() => {
        this.$store.commit("setAuthenticationStatus", true); //Upon succesful sign-in set authentication status to true.
      });
    },
    $checkAuthenticationStatus() {
      const currentAccounts = app.getAllAccounts();
      console.log(currentAccounts)

      return new Promise((resolve) => {
        if (currentAccounts === null) {
          console.log('No accounts signed in')
          this.$store.commit('setAuthenticationStatus', false)
          resolve();
        } else if (currentAccounts.length > 1) {
          //More than one account signed in currently
          for (var account in currentAccounts) {
            if (
              currentAccounts[account].tenantId == process.env.VUE_APP_TENANT_ID
            ) {
              loginBackend();
              this.$store.commit("setAuthenticationStatus", true);
              this.$store.commit("setAccount", currentAccounts[account])
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
            resolve(true)
          }
        }
        console.log(username);
      });
    },
    $getAccountID() {
      return app.getAccountByUsername(username).homeAccountId;
    },
    $signOut() {
      this.$store.commit("setAuthenticationStatus", false);
      app.logout({
        //TODO: Add the specific account here
      });
    },
  },
};
