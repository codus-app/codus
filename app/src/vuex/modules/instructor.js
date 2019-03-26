import Vue from 'vue';
import * as api from '../../api';
import store from '..';

export default {
  namespaced: true,

  state: {
    classrooms: [],
    classroomsFetched: false,
    selectedCode: null,
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
      state.classroomsFetched = true;

      const stored = localStorage.getItem('instructor-context');
      if (!state.selectedCode && stored && state.classrooms.map(c => c.code).includes(stored)) {
        state.selectedCode = stored;
      }
    },

    mutateClassroom(state, payload) {
      const index = state.classrooms.findIndex(c => c.code === payload.code);
      if (index < 0) state.classrooms = [...state.classrooms, payload];
      else Vue.set(state.classrooms, index, { ...state.classrooms[index], ...payload });
    },

    removeClassroom(state, code) {
      const index = state.classrooms.findIndex(c => c.code === code);
      if (index === -1) return false;
      Vue.delete(state.classrooms, index);
      if (code === state.selectedCode) state.selectedCode = null;
      return true;
    },

    switchClassroom(state, newCode) {
      if (!state.classrooms.map(({ code }) => code).includes(newCode)) state.selectedCode = null;
      else state.selectedCode = newCode;
      localStorage.setItem('instructor-context', state.selectedCode);
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
      commit('mutateClassroom', { ...classroom, fetched: true });
    },

    /** Create a classroom */
    async createClassroom({ commit }, { name }) {
      const classroom = await api.post({ endpoint: '/classroom/classrooms', body: { name }, store });
      commit('mutateClassroom', classroom);
      return classroom;
    },

    /** Delete a classroom */
    async deleteClassroom({ commit }, code) {
      await api.delete({ endpoint: `/classroom/${code}`, store });
      commit('removeClassroom', code);
    },
  },

  getters: {
    selectedClassroom(state) {
      if (state.selectedCode === null) return null;
      return state.classrooms.find(({ code }) => code === state.selectedCode) || {};
    },

    getClassroom: state => c => state.classrooms.find(({ code }) => code === c) || {},
  },
};
