import axios from 'axios'
import {host} from '@env'

const instance = axios.create({
  baseURL: host,
  headers: {
    'Content-Type': 'application/json'
  }
})

// response interceptor
instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // check if session expired
  if (error.response.status === 401 && error.response.data.error === "invalid_token") {
    return Promise.reject("session expired")
  }

  return Promise.reject(error)
})

export default instance