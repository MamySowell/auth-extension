// @ts-ignore
import prompts from 'app/quasar.extensions.json'
import { RouteRecordRaw } from "vue-router"

const {
  "@gastienne/auth": {
    LOCAL_LOGIN_ROUTE,
    LOCAL_CHECK_CODE_ROUTE,
    LOCAL_UPDATE_PASSWORD_ROUTE
  }
} = prompts

const routes: RouteRecordRaw[] = [
  {
    path: LOCAL_LOGIN_ROUTE,
    // @ts-ignore
    component: () => import('@gastienne/auth/pages/Auth.vue')
  },
  {
    path: LOCAL_CHECK_CODE_ROUTE,
    // @ts-ignore
    component: () => import('@gastienne/auth/pages/ResetCode.vue')
  },
  {
    path: LOCAL_UPDATE_PASSWORD_ROUTE,
    // @ts-ignore
    component: () => import('@gastienne/auth/pages/ResetPassword.vue')
  }
]

export default routes
