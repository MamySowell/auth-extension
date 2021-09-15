import axios from "axios";
// FIXME: find another way to call this path
//@ts-ignore
import prompts from "app/quasar.extensions.json";
import { boot } from "quasar/wrappers";
import { BootInterface } from "../interfaces";

const {
  "@sowell/auth": { AUTH_SERVER_BASE_URL },
} = prompts;

const $api = axios.create({
  baseURL: AUTH_SERVER_BASE_URL,
});

export default boot(({ app }: BootInterface) => {
  app.provide("$api", $api);
});
