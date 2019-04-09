import * as api from '../../api';
import store from '..';

export default {
  namespaced: true,

  state: {
    classroom: null,
  },

  mutations: {
    classroomFetched(state, payload) {
      // First time we're fetching, or the classroom we receive is somehow a different classroom
      //  from the old one
      if (!state.classroom || state.classroom.code !== payload.code) state.classroom = payload;
      else state.classroom = { ...state.classroom, ...payload };
    },
  },

  actions: {
    /** Fetch the classroom the user is currently in */
    async fetchClassroom({ commit }) {
      const classroom = await api.get({ endpoint: '/classroom', store });
      commit('classroomFetched', { ...classroom, fetched: true });
    },
  },
};
