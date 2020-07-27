import * as msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.VUE_APP_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.VUE_APP_TENANT_ID}`,
    redirectUri: "http://localhost:8080/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false, // Set this to true in the case of issues with Internet Explorer.
  },
};

const app = new msal.PublicClientApplication(msalConfig);

var username = "";

const loginRequest = {
  scopes: ["User.Read"],
};

// const tokenRequest = {
//   scopes: ["User.Read"],
//   forceRefresh: false, // If true, the auth will skip the cached token and go straight to the Azure server for authentication.
// };

function handleResponse(response) {
  //Create a fucntion to handle the response of the promise. This way, we can set the username and have the value persist without having it be a promise.
  if (response !== null) {
    username = response.account.username;
    console.log(username);
  }
}

function signIn() {
  //Create a popup with an interface for login credentials. This should only run if the authentication check fails, but currently this is not the case.
  console.log("Login in progress");
  return app
    .loginPopup(loginRequest)
    .then(handleResponse) //Instead of handling the response in a .then statement, we handle it in a callback function.
    .catch((err) => {
      console.error(err);
    });
}

export default {
  loadAuth() {
    return new Promise(function(resolve, reject) {
      const currentAccounts = app.getAllAccounts();
      console.log(currentAccounts)
      if (currentAccounts === null) {
        //No accounts signed in currently
        signIn().then(() => {
          resolve();
        }).catch(() => {
          reject();
        })
      } else if (currentAccounts.length > 1) {
        //More than one account signed in currently
        for (var account in currentAccounts) {
          if (currentAccounts[account].tenantId == process.env.VUE_APP_TENANT_ID) {
            resolve();
          }
        }
        console.log(currentAccounts);
        resolve();
      } else if (currentAccounts.length === 1) {
        //Exactly one account signed in.
        username = currentAccounts[0].username;
        console.log('One account logged in', currentAccounts);
        if (currentAccounts[0].tenantId == process.env.VUE_APP_TENANT_ID) {
          resolve();
        }
      }
    });
  },
  signOut() {
    //Logout the user. TODO: Add a reference to the current account so that the user is logged out without prompting.
    app.logout({
      account: app.getAccountByUsername(username),
    });
  },
};
