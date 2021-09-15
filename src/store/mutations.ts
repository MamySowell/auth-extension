import { MutationTree } from "vuex";
import { AuthStateInterface } from "../interfaces";

const mutation: MutationTree<AuthStateInterface> = {
  setToken(state, value) {
    return (state.token = value);
  },
};

export default mutation;
