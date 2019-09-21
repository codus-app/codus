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
      state.assignments = payload;
      state.assignmentsFetched = true;
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
  },
};
