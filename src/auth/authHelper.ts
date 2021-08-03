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

const loginRequest: any = {
  scopes: ['User.Read'],
}

const app = new msal.PublicClientApplication(msalConfig.authConfig)

export async function loginBackend() {
  const account: any = store.state.account
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

function setState(account: msal.AccountInfo) {
  if (account.localAccountId) {
    axios
      .get(`${process.env.VUE_APP_URL}employees/${account.localAccountId}/role`)
      .then((response) => {
        store.commit('setRole', response.data)
      })
    store.commit('setAccount', account)
    store.commit('setDisplayName', account.name)
  }
}

export async function signInAzure() {
  try {
    const result = await app.loginPopup(loginRequest)
    if (result.account) {
      store.commit('setAccount', result.account)
    }
  } catch (err) {
    throw err
  }
}

export async function checkSessionValidity() {
  try {
    return await axios
      .get(`${process.env.VUE_APP_URL}checkAuthentication`)
      .then(() => {
        const account = getCurrentAccount()
        if (account) {
          setState(account)
        } else {
          console.error('Failed to set account state as account is null')
        }
      })
  } catch (err) {
    throw err
  }
}

export function getCurrentAccount(): msal.AccountInfo {
  const accountInfo = app.getActiveAccount()
  if (accountInfo) return accountInfo

  const accounts = app.getAllAccounts() //Maybe this should look for the account with the proper tenant
  if (accounts) return accounts[0]
  throw 'Failed to get an active account'
}

export function getAccountId() {
  return getCurrentAccount().localAccountId
}

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
