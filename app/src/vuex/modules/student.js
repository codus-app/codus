import Vue from 'vue';
import * as api from '../../api';

export default {
  namespaced: true,

  state: {
    classroom: null,
    classroomFetched: false,
    assignments: [],
    assignmentsFetched: false,
  },

  mutations: {
    classroomFetched(state, payload) {
      // First time we're fetching, or the classroom we receive is somehow a different classroom
      //  from the old one
      if (!state.classroom || state.classroom.code !== payload.code) state.classroom = payload;
      else state.classroom = { ...state.classroom, ...payload };
      state.classroomFetched = true;
    },

    classroomLeft(state) {
      state.classroom = null;
      state.assignments = [];
      state.assignmentsFetched = false;
    },

    assignmentsFetched(state, payload) {
      if (!state.assignments.length) state.assignments = payload;
      else {
        state.assignments = payload
          .map(a => ({ ...a, ...state.assignments.find(a2 => a2.id === a.id) }));
      }
      state.assignmentsFetched = true;
    },

    assignmentFetched(state, payload) {
      const assignmentIndex = state.assignments.findIndex(a => a.id === payload.id);
      // Merge with existing assignment if it can be found
      if (assignmentIndex >= 0) {
        Vue.set(state.assignments, assignmentIndex, {
          ...state.assignments[assignmentIndex],
          ...payload,
          fetched: true,
        });
      // If this assignment has not yet been fetched, put it into the array
      } else {
        state.assignments = [
          ...state.assignments.filter(a => a.sortOrder <= payload.sortOrder),
          { ...payload, fetched: true },
          ...state.assignments.filter(a => (a.sortOrder || Infinity) > payload.sortOrder),
        ];
      }
    },
  },

  actions: {
    /** Fetch the classroom the user is currently in */
    async fetchClassroom({ commit }) {
      const classroom = await api.get({ endpoint: '/classroom' });
      commit('classroomFetched', classroom);
      return classroom;
    },

    async joinClassroom({ commit }, code) {
      const classroom = await api.get({ endpoint: `/classroom/join/${code}` });
      commit('classroomFetched', classroom);
      return classroom;
    },

    async leaveClassroom({ commit }) {
      const resp = await api.get({ endpoint: '/classroom/leave' });
      commit('classroomLeft');
      return resp;
    },

    async fetchAssignments({ commit }) {
      const assignments = await api.get({ endpoint: '/classroom/assignments' });
      commit('assignmentsFetched', assignments);
      return assignments;
    },

    // Fetch more info about an assignment including info about which problems have been solved
    async fetchAssignment({ commit }, assignmentCode) {
      const assignment = await api.get({ endpoint: `/classroom/assignments/${assignmentCode}` });
      commit('assignmentFetched', assignment);
      return assignment;
    },
  },
};
