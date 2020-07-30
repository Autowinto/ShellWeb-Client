import * as msal from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: process.env.VUE_APP_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.VUE_APP_TENANT_ID}`,
    redirectUri: process.env.VUE_APP_BASE_URL,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,// Set this to true in the case of issues with Internet Explorer.
  },
  
};

const loginRequest = {
  scopes: ["User.Read"]
};

var username = "";

const app = new msal.PublicClientApplication(msalConfig);

//Check authentication and update the isAuthenticated value in the vuex store.

export const authMixin =  {
  data() {
    return {
      msalClient: null,
      authenticated: false
    }
  },
  methods: {
    created() {
      this.msalClient = app;
    },
    $signIn() {
      app.loginPopup(loginRequest).then(() => {
        this.$store.commit('setAuthenticationStatus', true)
      })
    },
    $checkAuthenticationStatus() {
      console.log(this.$store.state.user.name)
      const currentAccounts = app.getAllAccounts();

      if (currentAccounts === null) {
        //No accounts signed in currently
      } else if (currentAccounts.length > 1) {
        //More than one account signed in currently
        for (var account in currentAccounts) {
          if (currentAccounts[account].tenantId == process.env.VUE_APP_TENANT_ID) {
            this.$store.commit('setAuthenticationStatus', true)
          }
        }
        console.log(currentAccounts);
      } else if (currentAccounts.length === 1) {
        //Exactly one account signed in.
        username = currentAccounts[0].username;
        console.log('One account logged in', currentAccounts);
        if (currentAccounts[0].tenantId == process.env.VUE_APP_TENANT_ID) {
          this.$store.commit('setAuthenticationStatus', true)
        }
      }
      console.log(username)
      this.$store.commit('setAuthenticationStatus', false)
    },
    $signOut() {
      app.logout({
        //TODO: Add the specific account here
      })
    }
  }
}