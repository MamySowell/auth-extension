import { ActionTree } from 'vuex';
import { AuthStateInterface } from './state';

const actions: ActionTree<AuthStateInterface, any> = {
  updateToken ({ commit }, value) {
    commit('setToken', value)
  }
};

export default actions;
