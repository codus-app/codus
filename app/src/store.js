import Vue from 'vue';
import Vuex from 'vuex';

import auth from './scripts/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: auth.isAuthenticated(),
  },
  mutations: {
    setLoggedIn(state) { state.loggedIn = true; },
    setLoggedOut(state) { state.loggedIn = false; },
  },
});
