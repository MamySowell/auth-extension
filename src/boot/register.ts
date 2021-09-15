//@ts-ignore
import prompts from "app/quasar.extensions.json";
import { boot } from "quasar/wrappers";
import { BootInterface } from "../interfaces";
import newRoutes from "../router";

export default boot(({ app, router }: BootInterface) => {
  app.provide("$prompts", prompts);
  // Register auth routes
  let { routes } = router.options;
  let routeData = routes.find((r) => r.path === "/");
  if (routeData?.children) {
    const currentRoutes = routeData.children.map((route) => route.path);

    newRoutes.forEach((route) => {
      if (!currentRoutes.includes(route.path)) {
        router.addRoute(route);
      }
    });
  }
});
