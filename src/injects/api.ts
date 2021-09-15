import { AxiosInstance } from "axios";
import { inject } from "vue";

export const $api = () => {
  const $api = inject<AxiosInstance>("$api");
  if ($api == undefined) {
    throw Error("Could not inject api");
  }
  return $api;
};
