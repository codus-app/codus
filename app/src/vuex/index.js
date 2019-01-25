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
    user: {
      profile: {},
      solved: null, // null indicates that not fetched, rather than that there are none
      solutionsBegun: null,
      solutions: [],
    },

    categories: [],
    categoriesFetched: false,

    testResults: {},

    solutionSaveInProgress: false,
    solutionCheckInProgress: false,
  },

  mutations,
  actions,
  getters,
  modules: { auth },
});
