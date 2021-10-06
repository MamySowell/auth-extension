import axios from "axios";
// FIXME: find another way to call this path
//@ts-ignore
import prompts from "app/quasar.extensions.json";
import { headers } from "../config/setupHeaders";
import { boot } from "quasar/wrappers";

const {
  "@sowell/auth": { AUTH_SERVER_BASE_URL },
} = prompts;

const $api = axios.create({
  baseURL: AUTH_SERVER_BASE_URL,
  headers,
});

export default boot(({ app }) => {
  app.provide("$api", $api);
});
