import { Router } from "vue-router";
import { Store } from "vuex";

export interface BootInterface {
  router: Router;
  store: Store<any>;
  app: any;
}
