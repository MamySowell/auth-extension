import { GetterTree } from 'vuex';
import { AuthStateInterface } from './state';

const getters: GetterTree<AuthStateInterface, any> = {
  getToken (state) {
    return state.token
  }
};

export default getters;
