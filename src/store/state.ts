import { AuthStateInterface } from "../interfaces";

function state(): AuthStateInterface {
  return {
    token: "",
  };
}

export default state;
