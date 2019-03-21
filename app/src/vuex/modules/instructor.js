import * as api from '../../api';
import store from '..';

export default {
  namespaced: true,

  state: {
    classes: [],
  },

  mutations: {
    classesFetched(state, payload) {
      // An index of codes of classes that are already represented in Vuex
      const storedCodes = state.classes.map(c => c.code);
      // All of the classes that were fetched that were not previously represented in Vuex
      const fresh = payload.filter(c => !storedCodes.includes(c.code));
      state.classes = [
        // Update already-stored classes with new info from the request
        ...state.classes.map(c => ({ ...c, ...payload.find(c2 => c2.code === c.code) })),
        // Add new classes
        ...fresh,
      ];
    },
  },

  actions: {
    async fetchClasses({ commit }) {
      const classes = await api.get({ endpoint: '/classroom/classrooms', store });
      commit('classesFetched', classes);
    },
  },
};
