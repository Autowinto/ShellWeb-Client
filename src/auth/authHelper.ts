// import router from '@/router'
import * as msal from '@azure/msal-browser'
import axios from 'axios'
import store from './store'

const msalConfig = {
  graphEndpoints: {
    graphUserEndpoint: 'https://graph.microsoft.com/v1.0/me',
  },
  authConfig: {
    auth: {
      clientId: process.env.VUE_APP_CLIENT_ID || '',
      authority: `https://login.microsoftonline.com/${process.env.VUE_APP_TENANT_ID}`,
      redirectUri: process.env.VUE_APP_BASE_URL,
      // navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false, // Set this to true in the case of issues with Internet Explorer.
    },
  },
}

//FIXME: Rewrite this to be just a utility helper instead of a mixin

const loginRequest: any = {
  scopes: ['User.Read'],
}

const app = new msal.PublicClientApplication(msalConfig.authConfig)

//Check authentication and update the isAuthenticated value in the vuex store.

export async function loginBackend() {
  const account = app.getAccountByHomeId(accountId)
  if (account) {
    try {
      const token = await getToken()
      return await axios.post(
        `${process.env.VUE_APP_URL}login`,
        {
          accountId: account.localAccountId,
          email: account.username,
          name: account.name,
        },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )
    } catch (err) {
      throw err
    }
  }
}

// function getGraphToken(accountValue: any) {
//   loginRequest.account = accountValue
//   return app
//     .acquireTokenSilent(loginRequest)
//     .then((accessToken) => {
//       return accessToken
//     })
//     .catch((error) => {
//       console.log(
//         'Error in acquiring the access token silently. Acquiring via popup instead',
//         error
//       )

//       return app
//         .acquireTokenPopup(loginRequest)
//         .then((accessToken) => {
//           return accessToken
//         })
//         .catch((error) => {
//           console.log('Error in acquiring the access token via popup.', error)
//         })
//     })
// }

function setState(account: msal.AccountInfo) {
  if (account.localAccountId) {
    axios
      .get(`${process.env.VUE_APP_URL}employees/${account.localAccountId}/role`)
      .then((response) => {
        store.commit('setRole', response.data)
      })

    store.commit('setDisplayName', account.name)
  }
}

export async function signInAzure() {
  try {
    const result = await app.loginPopup(loginRequest)
    if (result.account) {
      accountId = result.account?.homeAccountId
      store.commit('setAccount', result.account)
    }
  } catch (err) {
    throw err
  }
}

// export function signIn(this: any) {
//   app.loginPopup(loginRequest).then((res) => {
//     const account = app.getAllAccounts()[0]
//     console.log(account)
//     this.username = account.username //Upon succesful login, there should only ever be one account logged in.
//     store.commit('setAccount', account)
//     store.commit('setAuthenticationStatus', true) //Upon succesful sign-in set authentication status to true.
//     return res
//   })
// }

export async function checkSessionValidity() {
  try {
    return await axios
      .get(`${process.env.VUE_APP_URL}checkAuthentication`)
      .then(() => {
        const account = store.state.account
        if (account) {
          setState(account)
        }
      })
  } catch (err) {
    throw err
  }
}

// export function checkAuthenticationStatus() {
//   const currentAccounts = app.getAllAccounts()

//   return new Promise((resolve, reject) => {
//     if (currentAccounts.length === 0) {
//       console.log('No accounts signed in')
//       store.commit('setAuthenticationStatus', false)
//       reject()
//     } else if (currentAccounts.length > 1) {
//       //More than one account signed in currently
//       for (const account in currentAccounts) {
//         if (
//           currentAccounts[account].tenantId == process.env.VUE_APP_TENANT_ID
//         ) {
//           getGraphToken(currentAccounts[account]) //Attempt getting a graph token to truly make sure that the user is authenticated.
//             .then(() => {
//               loginBackend(currentAccounts[account])
//               store.commit('setAuthenticationStatus', true)
//               store.commit('setAccount', currentAccounts[account])
//               resolve(true)
//             })
//             .catch(() => {
//               console.log('Failed Authenticaton')
//             })
//         }
//       }
//       console.log(currentAccounts)
//     } else if (currentAccounts.length === 1) {
//       //Exactly one account signed in.
//       username = currentAccounts[0].username
//       console.log('One account logged in')
//       if (currentAccounts[0].tenantId == process.env.VUE_APP_TENANT_ID) {
//         getGraphToken(currentAccounts[0]) //Attempt getting a graph token to truly make sure that the user is authenticated.
//           .then((accessToken) => {
//             loginBackend(currentAccounts[0])
//             store.commit('setAuthenticationStatus', true)
//             store.commit('setAccount', currentAccounts[0])
//             resolve(true)
//           })
//           .catch(() => {
//             console.log('Failed Authenticaton')
//             reject()
//           })
//       }
//     }
//   })
// }

export function getCurrentAccount(): msal.AccountInfo {
  const accountInfo = app.getActiveAccount()
  if (accountInfo) return accountInfo

  const accounts = app.getAllAccounts() //Maybe this should look for the account with the proper tenant
  console.log(accounts[0])
  if (accounts) return accounts[0]
  throw 'Failed to get an active account'
}

// export function getUserAccessLevel(this: any) {
//   return this.$store.state.role.role
// }

export function getAccountId() {
  return getCurrentAccount().localAccountId
}

// export function getAccountGraph(accountValue: any) {
//   return getGraphToken(accountValue).then((response: any) => {
//     const accessToken = response.accessToken
//     const config = {
//       headers: {
//         authorization: `bearer ${accessToken}`,
//       },
//     }

//     return axios
//       .get(msalConfig.graphEndpoints.graphUserEndpoint, config)
//       .then((graphResponse) => {
//         return graphResponse
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   })
// }

export async function getToken() {
  try {
    const silentRequest = loginRequest
    loginRequest.account = getCurrentAccount()
    const request = await app.acquireTokenSilent(loginRequest)
    return request.idToken
  } catch (err) {
    throw err
  }
}
