import axios from 'axios'

import store from '@/store'

// Create client.
const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
const previousState = JSON.parse(localStorage.getItem('session'))
let authToken = null


// Inject current API token into each request.
client.interceptors.request.use((config) => {
  if (store.getters.authToken) {
    authToken = store.getters.authToken
  } else if (previousState && previousState.token) {
    authToken = previousState.token
  }

  // only inject if not set
  if (!config.headers.Authorization && authToken) {
    config.headers.Authorization = authToken
  }

  // Remember to unblock on CORS
  return config
})

export default client
