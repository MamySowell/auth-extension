import newRoutes from '../router'
import authModule from '../store'
import { boot } from 'quasar/wrappers'
import authHepler from '../utils/helpers'

import { axiosInstance } from '../utils/axios'

export default boot(({ app, router, store }) => {
  // Register store module  
  store.registerModule('auth', authModule)

  app.provide("$store", store)
  app.provide("$auth", authHepler)
  app.provide('$axios', axiosInstance)
  
  // Register auth routes
  let { routes } = router.options
  let routeData = routes.find((r) => r.path === "/")
  const currentRoutes = routeData.children.map((route) => route.path)

  newRoutes.forEach((route) => {
    if (!currentRoutes.includes(route.path)) {
      router.addRoute(route)
    }
  })
})
