/* eslint-disable import/first */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

import auth from './auth';

export default new Vuex.Store({
  state: {
    categories: [],
    categoriesFetched: false,

    solutionSaveInProgress: false,
  },

  mutations,
  actions,
  getters,
  modules: { auth },
});
