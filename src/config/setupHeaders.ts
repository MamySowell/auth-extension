import { AxiosRequestConfig } from "axios"

let headers: Pick<AxiosRequestConfig, "headers">
const setup_headers = (payload: Pick<AxiosRequestConfig, "headers">) => {
  headers = payload
}

export { setup_headers, headers }
