import axios from 'axios'
import { getToken } from '../auth/authHelper'

export const msAxios = axios.create({})

axios.interceptors.request.use(async (config) => {
  let token = await getToken()

  if (config.url == 'https://graph.microsoft.com/v1.0/me') return config

  config.headers = {
    authorization: `bearer ${token.idToken}`,
  }

  return config
})
