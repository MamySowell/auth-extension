import axios, { AxiosInstance, AxiosError } from "axios"
import qs from "qs"

// @ts-ignore
import prompts from "app/quasar.extensions.json"

const { "@gastienne/auth": { AUTH_SERVER_BASE_URL } } = prompts

export const axiosInstance: AxiosInstance = axios.create({
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
  baseURL: AUTH_SERVER_BASE_URL
})

export const setErrorInterceptor = (errorFunction: () => void) => {
  axiosInstance.interceptors.response.use((response) => {
    return response
  }, (error: AxiosError) => {
    if (!error.response) {
      errorFunction()
    }
    return Promise.reject(error)
  })
}
