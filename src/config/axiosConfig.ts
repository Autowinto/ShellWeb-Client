import axios, { AxiosError } from 'axios'
import { getToken } from '../auth/authHelper'
import router from '../router'

export const msAxios = axios.create({})

axios.interceptors.request.use(async (config) => {
  if (config.url == 'https://graph.microsoft.com/v1.0/me') {
    return config
  }

  config.withCredentials = true

  return config
})

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (err: AxiosError) => {
    throw err
  }
)
