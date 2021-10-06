// @ts-ignore
import prompts from "app/quasar.extensions.json"
import { boot } from "quasar/wrappers"

export default boot(({ router, store }) => {
  const {
    "@sowell/auth": { LOCAL_LOGIN_ROUTE, LOCAL_CHECK_CODE_ROUTE }
  } = prompts

  router.beforeEach((to, from, next) => {
    const isAuthenticated = !!store.state.auth.token
    if (
      !isAuthenticated &&
      to.path !== LOCAL_LOGIN_ROUTE &&
      to.path !== LOCAL_CHECK_CODE_ROUTE
    ) {
      next(LOCAL_LOGIN_ROUTE)
    } else {
      next()
    }
  })
})
