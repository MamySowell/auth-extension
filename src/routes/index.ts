// @ts-ignore
import prompts from "app/quasar.extensions.json";
import { RouteRecordRaw } from "vue-router";

const {
  "@sowell/auth": { LOCAL_LOGIN_ROUTE },
} = prompts;

const routes: RouteRecordRaw[] = [
  {
    path: LOCAL_LOGIN_ROUTE,
    // @ts-ignore
    component: () => import("@sowell/auth/pages/Auth.vue"),
  },
];

export default routes;
