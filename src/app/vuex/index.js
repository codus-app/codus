/* eslint-disable import/first */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default new Vuex.Store({
  state: {
    user: { solutions: [] },
    userFetched: false,

    categories: [],
    categoriesFetched: false,
  },

  mutations,
  actions,
  getters,
});
