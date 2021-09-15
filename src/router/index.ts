import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/auth",
    // @ts-ignore
    component: () => import("@gastienne/auth/pages/App.vue"),
  },
];

export default routes;
