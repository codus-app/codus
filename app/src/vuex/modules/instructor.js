import Vue from 'vue';
import * as api from '../../api';

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
      if (index === -1) state.classrooms = [...state.classrooms, payload];
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

    removeUser(state, { classroom, username }) {
      const index = state.classrooms.findIndex(c => c.code === classroom);
      if (index === -1) return false;
      Vue.set(state.classrooms, index, {
        ...state.classrooms[index],
        students: state.classrooms[index].students.filter(s => s.username !== username),
      });
      return true;
    },
  },

  /** Fetch a list of all managed classrooms from the API */
  actions: {
    async fetchClassrooms({ commit }) {
      const classrooms = await api.get({ endpoint: '/classroom/classrooms' });
      commit('classroomsFetched', classrooms);
    },

    /** Hydrate a stored classroom with additional info (i.e. students) that is only exposed when
      * querying that classroom directly
      */
    async fetchClassroom({ commit }, code) {
      const classroom = await api.get({ endpoint: `/classroom/${code}` });
      commit('mutateClassroom', { ...classroom, fetched: true });
    },

    /** Create a classroom */
    async createClassroom({ commit }, { name }) {
      const classroom = await api.post({ endpoint: '/classroom/classrooms', body: { name } });
      commit('mutateClassroom', classroom);
      return classroom;
    },

    /** Delete a classroom */
    async deleteClassroom({ commit }, code) {
      await api.delete({ endpoint: `/classroom/${code}` });
      commit('removeClassroom', code);
    },

    /** Remove a student from a classroom */
    async removeUser({ commit }, { classroom, username }) {
      await api.delete({ endpoint: `/classroom/${classroom}/students/${username}` });
      commit('removeUser', { classroom, username });
    },
  },

  getters: {
    selectedClassroom(state) {
      if (state.selectedCode === null) return null;
      return state.classrooms.find(({ code }) => code === state.selectedCode) || null;
    },

    getClassroom: state => c => state.classrooms.find(({ code }) => code === c) || null,
  },
};
