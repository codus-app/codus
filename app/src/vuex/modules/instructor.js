import Vue from 'vue';
import * as api from '../../api';

export default {
  namespaced: true,

  state: {
    classrooms: [],
    classroomsFetched: false,
    selectedCode: null,
    studentSolutions: {}, // { username: [solutions] }
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

    classroomDeleted(state, code) {
      const index = state.classrooms.findIndex(c => c.code === code);
      if (index === -1) return false;
      Vue.delete(state.classrooms, index);
      if (code === state.selectedCode) state.selectedCode = null;
      return true;
    },

    classroomCodeChanged(state, { oldCode, code }) {
      const index = state.classrooms.findIndex(c => c.code === oldCode);
      if (index === -1) return false;
      Vue.set(state.classrooms, index, { ...state.classrooms[index], code });
      if (state.selectedCode === oldCode) {
        state.selectedCode = code;
        localStorage.setItem('instructor-context', state.selectedCode);
      }
      if (window.app && window.app.$router) {
        const router = window.app.$router;
        router.replace({
          name: router.currentRoute.name,
          params: { ...router.currentRoute.params, classroomCode: code },
        });
      }
      return true;
    },

    switchClassroom(state, newCode) {
      if (!state.classrooms.map(({ code }) => code).includes(newCode)) state.selectedCode = null;
      else state.selectedCode = newCode;
      localStorage.setItem('instructor-context', state.selectedCode);
    },

    userRemoved(state, { classroom, username }) {
      const index = state.classrooms.findIndex(c => c.code === classroom);
      if (index === -1) return false;
      Vue.set(state.classrooms, index, {
        ...state.classrooms[index],
        students: state.classrooms[index].students.filter(s => s.username !== username),
      });
      return true;
    },

    assignmentFetched(state, { classroom: classroomCode, assignment }) {
      const classroomIndex = state.classrooms.findIndex(c => c.code === classroomCode);
      if (classroomIndex === -1) throw new Error(`Classroom ${classroomCode} not found`);
      const classroom = state.classrooms[classroomIndex];
      if (!classroom.assignments) throw new Error(`Classroom ${classroomCode} should be fetched before assignments to avoid race conditions.`);

      const assignmentIndex = classroom.assignments.findIndex((a => a.id === assignment.id));
      if (assignmentIndex === -1) state.classrooms[classroomIndex].assignments.push(assignment);
      else {
        Vue.set(state.classrooms[classroomIndex].assignments, assignmentIndex, {
          ...state.classrooms[classroomIndex].assignments[assignmentIndex],
          ...assignment,
        });
      }
    },

    assignmentsReordered(state, { classroom: classroomCode, assignments: newAssignments }) {
      const index = state.classrooms.findIndex(c => c.code === classroomCode);
      if (index === -1) throw new Error(`Classroom ${classroomCode} not found`);
      const classroom = state.classrooms[index];
      // New assignment order from passed array of new assignments
      const newOrder = newAssignments.map(a => a.id);
      // Make sure every assignment ID is in the new order
      if (!classroom.assignments.every(({ id }) => newOrder.includes(id))) throw new Error('New assignment order incomplete');

      Vue.set(state.classrooms, index, {
        ...state.classrooms[index],
        assignments: classroom.assignments
          // Sort by new order
          .sort(({ id: idA }, { id: idB }) => newOrder.indexOf(idA) - newOrder.indexOf(idB))
          // Add info from new assignments
          .map(assignment => ({
            ...assignment,
            ...newAssignments.find(({ id }) => id === assignment.id),
          })),
      });
      return true;
    },

    assignmentDeleted(state, { classroom: classroomCode, id: assignmentId }) {
      const index = state.classrooms.findIndex(c => c.code === classroomCode);
      if (index === -1) throw new Error(`Classroom ${classroomCode} not found`);
      const classroom = state.classrooms[index];

      Vue.set(state.classrooms, index, {
        ...state.classrooms[index],
        assignments: classroom.assignments
          .filter(({ id }) => id !== assignmentId),
      });
    },

    studentSolutionsFetched(state, { username, solutions }) {
      Vue.set(state.studentSolutions, username, solutions);
    },

    studentSolutionFetched(state, { username, category, problemName, solution }) {
      // If there's no list of this student's solutions, start one
      if (!state.studentSolutions[username]) Vue.set(state.studentSolutions, username, []);

      const index = state.studentSolutions[username]
        .findIndex(({ problem }) => problem.category === category && problem.name === problemName);
      // Problem hasn't been fetched
      if (index === -1) state.studentSolutions[username].push(solution);
      // Problem has already been fetched
      else {
        state.studentSolutions[username][index] = {
          ...state.studentSolutions[username][index],
          ...solution,
        };
      }
    },
  },

  actions: {
    /** Fetch a list of all managed classrooms from the API */
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

    /** Change a classroom's name */
    async renameClassroom({ commit }, { code, newName }) {
      const { name: assignedName } = await api.put({ endpoint: `/classroom/${code}/name`, body: { name: newName } });
      if (assignedName) commit('mutateClassroom', { code, name: assignedName });
    },

    /** Refresh a classroom's code with a randomly selected new code */
    async regenerateCode({ commit }, oldClassroomCode) {
      const { code } = await api.post({ endpoint: `/classroom/${oldClassroomCode}/regenerateCode` });
      commit('classroomCodeChanged', { oldCode: oldClassroomCode, code });
    },

    /** Delete a classroom */
    async deleteClassroom({ commit }, code) {
      const { success } = await api.delete({ endpoint: `/classroom/${code}` });
      if (success) commit('classroomDeleted', code);
    },

    /** Remove a student from a classroom */
    async removeUser({ commit }, { classroom, username }) {
      await api.delete({ endpoint: `/classroom/${classroom}/students/${username}` });
      commit('userRemoved', { classroom, username });
    },

    /** Hydrate a stored assignment with additional info (i.e. problems, student performance) that
      * is only exposed when querying that assignment directly
      */
    async fetchAssignment({ commit }, { classroom, id }) {
      const assignment = await api.get({ endpoint: `/classroom/${classroom}/assignments/${id}` });
      commit('assignmentFetched', { classroom, assignment: { ...assignment, fetched: true } });
    },

    /** Post a new assignment to a classroom */
    async postAssignment({ commit }, { classroom, name, description, dueDate, problems }) {
      const assignment = await api.post({
        endpoint: `/classroom/${classroom}/assignments`,
        body: { name, description, dueDate, problems },
      });
      commit('assignmentFetched', { classroom, assignment });
    },

    async mutateAssignment({ commit }, { classroom, assignment }) {
      if (!assignment.id) throw new Error('Assignment ID is required');
      const updated = await api.patch({
        endpoint: `/classroom/${classroom}/assignments/${assignment.id}`,
        body: assignment,
      });
      commit('assignmentFetched', { classroom, assignment: updated });
    },

    /** Change the order of the assignments in a classroom */
    async reorderAssignments({ commit }, { classroom, ids }) {
      // Mock reordering API response so that changes are immediately applied client-side
      commit('assignmentsReordered', {
        classroom,
        assignments: ids.map((id, i) => ({ id, sortOrder: i })),
      });
      // Perform API request to actually change order
      const assignments = await api.patch({ endpoint: `/classroom/${classroom}/assignmentOrder`, body: ids });
      // Change order / mutate assignments based on actual response
      commit('assignmentsReordered', { classroom, assignments });
    },

    /** Delete an assignment from a classroom */
    async deleteAssignment({ commit }, { classroom, id }) {
      const { success } = await api.delete({ endpoint: `/classroom/${classroom}/assignments/${id}` });
      if (success) commit('assignmentDeleted', { classroom, id });
    },

    async fetchStudentSolutions({ commit }, { username }) {
      const solutions = await api.get({ endpoint: `/classroom/students/${username}/solutions` });
      commit('studentSolutionsFetched', { username, solutions });
    },

    async fetchStudentSolution({ commit }, { username, category, problemName }) {
      const solution = await api.get({ endpoint: `/classroom/students/${username}/solutions/${category}/${problemName}` });
      // Update problem info for the problem this solution came from
      const { problem: problemFetched } = solution;
      commit('problemFetched', problemFetched, { root: true });
      // Record this student's solution to this problem
      commit('studentSolutionFetched', { username, category, problemName, solution });
    },

    async checkStudentSolution(_, { username, category, problemName }) {
      const result = await api.get({ endpoint: `/classroom/students/${username}/solutions/${category}/${problemName}/check` });
      return result;
    },
  },

  getters: {
    selectedClassroom(state) {
      if (state.selectedCode === null) return null;
      return state.classrooms.find(({ code }) => code === state.selectedCode) || null;
    },

    getClassroom: state => c => state.classrooms.find(({ code }) => code === c) || null,

    getStudentSolutions: state => username => state.studentSolutions[username],

    /* eslint-disable max-len */
    getStudentSolution: state => (username, searchCategory, searchProblem) => (state.studentSolutions[username] || [])
      .find(({ problem }) => (problem.category.name || problem.category) === searchCategory && problem.name === searchProblem)
      || null,
    /* eslint-enable */

    // Students whose solutions have been fetched
    fetchedStudents: state => Object.keys(state.studentSolutions),
  },
};
