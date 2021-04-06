import * as msal from '@azure/msal-browser'
import axios from 'axios'
import store from '../store'

const msalConfig = {
  graphEndpoints: {
    graphUserEndpoint: 'https://graph.microsoft.com/v1.0/me',
  },
  authConfig: {
    auth: {
      clientId: process.env.VUE_APP_CLIENT_ID,
      authority: `https://login.microsoftonline.com/${process.env.VUE_APP_TENANT_ID}`,
      redirectUri: process.env.VUE_APP_BASE_URL,
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false, // Set this to true in the case of issues with Internet Explorer.
    },
  },
}

//FIXME: Rewrite this to be just a utility helper instead of a mixin

const loginRequest = {
  scopes: ['User.Read'],
}

var username = ''

const app = new msal.PublicClientApplication(msalConfig.authConfig)

//Check authentication and update the isAuthenticated value in the vuex store.

function loginBackend(account) {
  axios
    .post(`${process.env.VUE_APP_URL}login`, {
      accountId: account.homeAccountId,
      email: account.username,
      name: account.name,
    })
    .catch((err) => {
      console.log(err)
    })
}

function getGraphToken(accountValue) {
  loginRequest.account = accountValue
  return app
    .acquireTokenSilent(loginRequest)
    .then((accessToken) => {
      return accessToken
    })
    .catch((error) => {
      console.log(
        'Error in acquiring the access token silently. Acquiring via popup instead',
        error
      )

      return app
        .acquireTokenPopup(this.loginRequest)
        .then((accessToken) => {
          return accessToken
        })
        .catch((error) => {
          console.log('Error in acquiring the access token via popup.', error)
        })
    })
}

export function setRole(role) {
  store.commit('setRole', role)
}

export function setDisplayName(name) {
  store.commit('setDisplayName', name)
}

export function signIn() {
  console.log('Signing in')
  app.loginPopup(loginRequest).then(async () => {
    const account = app.getAllAccounts()[0]
    this.username = account.username //Upon succesful login, there should only ever be one account logged in.
    store.commit('setAccount', account)
    store.commit('setAuthenticationStatus', true) //Upon succesful sign-in set authentication status to true.
  })
}
export function checkAuthenticationStatus() {
  const currentAccounts = app.getAllAccounts()

  return new Promise((resolve, reject) => {
    if (currentAccounts.length === 0) {
      console.log('No accounts signed in')
      store.commit('setAuthenticationStatus', false)
      reject()
    } else if (currentAccounts.length > 1) {
      //More than one account signed in currently
      for (var account in currentAccounts) {
        if (currentAccounts[account].tenantId == process.env.VUE_APP_TENANT_ID) {
          getGraphToken(currentAccounts[account]) //Attempt getting a graph token to truly make sure that the user is authenticated.
            .then(() => {
              loginBackend(currentAccounts[account])
              store.commit('setAuthenticationStatus', true)
              store.commit('setAccount', currentAccounts[account])
              resolve(true)
            })
            .catch(() => {
              console.log('Failed Authenticaton')
            })
        }
      }
      console.log(currentAccounts)
    } else if (currentAccounts.length === 1) {
      //Exactly one account signed in.
      username = currentAccounts[0].username
      console.log('One account logged in')
      if (currentAccounts[0].tenantId == process.env.VUE_APP_TENANT_ID) {
        getGraphToken(currentAccounts[0]) //Attempt getting a graph token to truly make sure that the user is authenticated.
          .then((accessToken) => {
            console.log(accessToken)
            loginBackend(currentAccounts[0])
            store.commit('setAuthenticationStatus', true)
            store.commit('setAccount', currentAccounts[0])
            resolve(true)
          })
          .catch(() => {
            console.log('Failed Authenticaton')
            reject()
          })
      }
    }
  })
}

export function getCurrentAccount() {
  console.log(app.getAccountByUsername(username))
  return app.getAccountByUsername(username)
}

export function getUserAccessLevel() {
  return this.$store.state.role.role
}

export function getAccountId() {
  return getCurrentAccount().homeAccountId
}

export function getAccountGraph(accountValue) {
  return getGraphToken(accountValue).then((response) => {
    let accessToken = response.accessToken
    const config = {
      headers: {
        authorization: `bearer ${accessToken}`,
      },
    }

    return axios
      .get(msalConfig.graphEndpoints.graphUserEndpoint, config)
      .then((graphResponse) => {
        return graphResponse
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

export function getToken() {
  return app.acquireTokenSilent(loginRequest)
}

export function signOut() {
  store.commit('setAuthenticationStatus', false)
  app.logout({
    //TODO: Add the specific account here
  })
}
