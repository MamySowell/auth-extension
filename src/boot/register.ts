import { boot } from "quasar/wrappers";
import { BootInterface } from "../interfaces";
import newRoutes from "../router";

export default boot(({ router }: BootInterface) => {
  // Register auth routes
  let { routes } = router.options;
  let routeData = routes.find((r) => r.path === "/");
  const currentRoutes = routeData.children.map((route) => route.path);

  newRoutes.forEach((route) => {
    if (!currentRoutes.includes(route.path)) {
      router.addRoute(route);
    }
  });
});
