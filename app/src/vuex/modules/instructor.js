import Vue from 'vue';
import * as api from '../../api';
import store from '..';

export default {
  namespaced: true,

  state: {
    classrooms: [],
  },

  mutations: {
    classroomsFetched(state, payload) {
      // An index of codes of classrooms that are already represented in Vuex
      const storedCodes = state.classrooms.map(c => c.code);
      // All of the classrooms that were fetched that were not previously represented in Vuex
      const fresh = payload.filter(c => !storedCodes.includes(c.code));
      state.classrooms = [
        // Update already-stored classrooms with new info from the request
        ...state.classrooms.map(c => ({ ...c, ...payload.find(c2 => c2.code === c.code) })),
        // Add new classrooms
        ...fresh,
      ];
    },

    mutateClassroom(state, payload) {
      const index = state.classrooms.findIndex(c => c.code === payload.code);
      if (index < 0) state.classrooms = [...state.classrooms, payload];
      else Vue.set(state.classrooms, index, { ...state.classrooms[index], ...payload });
    },

    removeClassroom(state, payload) {
      const index = state.classrooms.findIndex(c => c.code === payload);
      Vue.delete(state.classrooms, index);
    },
  },

  /** Fetch a list of all managed classrooms from the API */
  actions: {
    async fetchClassrooms({ commit }) {
      const classrooms = await api.get({ endpoint: '/classroom/classrooms', store });
      commit('classroomsFetched', classrooms);
    },

    /** Hydrate a stored classroom with additional info (i.e. students) that is only exposed when
      * querying that classroom directly
      */
    async fetchClassroom({ commit }, code) {
      const classroom = await api.get({ endpoint: `/classroom/${code}`, store });
      commit('mutateClassroom', classroom);
    },

    /** Create a classroom */
    async createClassroom({ commit }, { name }) {
      const classroom = await api.post({ endpoint: '/classroom/classrooms', body: { name }, store });
      commit('mutateClassroom', classroom);
    },

    /** Delete a classroom */
    async deleteClassroom({ commit }, code) {
      await api.delete({ endpoint: `/classroom/${code}`, store });
      commit('removeClassroom', code);
    },
  },
};
