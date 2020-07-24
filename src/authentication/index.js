import * as msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.VUE_APP_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.VUE_APP_TENANT_ID}`,
    redirectUri: "http://localhost:8080/authsuccess"
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  },
};

const app = new msal.PublicClientApplication(msalConfig);

//var currentAccount = null TODO: IMPLEMENT THIS PROPERLY

const request = {
  scopes: ["User.Read"]
};

const tokenRequestSilent = {
  scopes: ["User.Read"]
};

export default {
   initialize() { //Return a promise such as to delay creating the webpage until authentication is finished.
    return new Promise((resolve) => {
      this.isAuthenticated()
        .then((res) =>{
          console.log(res)
          if (res === true) {
            resolve();
          } else {
            this.login();
            //reject();
          }
        })
    })
  },
  login() { //Create a popup with an interface for login credentials. This should only run if the authentication check fails, but currently this is not the case.
    console.log('Login in progress')
    app.loginPopup(request).then(
      (res) => {
        console.log(res)
      },
      (error) => {
        console.log("Login error " + error);
      }
    );
  },
  logout() { //Logout the user. TODO: Add a reference to the current account so that the user is logged out without prompting.
    console.log(this.app);
    app.logout({
    });
  },
  isAuthenticated() { //Test authentication status by acquiring a token.
    return app
      .acquireTokenPopup(tokenRequestSilent) //Replace this by the acquireTokenSilent method to avoid unnecessary popups. This requires having an account object in the tokenRequestSilent object.
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  },
};
