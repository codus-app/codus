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
    // Caches information about the currently authenticated user
    user: {
      profile: {},
      solved: null, // null indicates that not fetched, rather than that there are none
      solutionsBegun: null,
      // Caches solutions to problems
      solutions: [],
      solutionSaveInProgress: false, // Is the solution currently being saved?
    },

    // Stores category / problem information, i.e. the static content of the site
    categories: [],
    contentFetched: false, // Has site content (problems/categories) been fetched?
    // Stores the results of evaluating test cases for each tested problem
    // Keys are of the form 'category/problemName'
    testResults: {},
    solutionCheckInProgress: false, // Is the solution currently being checked?

  },

  mutations,
  actions,
  getters,
  modules: { auth },
});
