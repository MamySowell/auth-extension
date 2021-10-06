import { axiosInstance } from "./axios"
// @ts-ignore
import prompts from "app/quasar.extensions.json"

const {
  "@sowell/auth": {
    AUTH_SERVER_SIGNING_ROUTE,
    AUTH_SERVER_RESET_PASSWORD_ROUTE,
    AUTH_SERVER_UPDATE_PASSWORD_ROUTE
  }
} = prompts

export interface AuthHelper {
  resetPassword(data: any): Promise<any>
  updatePassword(data: any): Promise<any>
  signIn(data: any): Promise<any>
}

const authHepler: AuthHelper = {
  resetPassword (data) {
    return axiosInstance.post(AUTH_SERVER_RESET_PASSWORD_ROUTE, data)
  },
  updatePassword (data) {
    return axiosInstance.patch(AUTH_SERVER_UPDATE_PASSWORD_ROUTE, data)
  },
  signIn (data) {
    return axiosInstance.post(AUTH_SERVER_SIGNING_ROUTE, data)
  }
}

export default authHepler
