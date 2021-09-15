// @ts-ignore
import prompts from "app/quasar.extensions.json";
import { boot } from "quasar/wrappers";
import { BootInterface } from "../interfaces";

export default boot(({ router, store }: BootInterface) => {
  const {
    "@sowell/auth": { LOCAL_LOGIN_ROUTE },
  } = prompts;

  router.beforeEach((to, from, next) => {
    if (to.path !== LOCAL_LOGIN_ROUTE) {
      next(LOCAL_LOGIN_ROUTE);
    } else {
      next();
    }
  });
});
