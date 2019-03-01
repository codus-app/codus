import * as api from '../api';
import store from '.';

export default {
  // Update list of solutions
  async fetchSolved({ commit }) {
    const solutions = await api.get({ endpoint: 'user/solutions', store });
    commit('updateSolvedList', solutions);
    commit('updateSolutionsBegunList', solutions);
  },

  // Update basic info about category listings
  async fetchContent({ commit }) {
    const categories = await api.get({ endpoint: 'categories', store });
    commit('contentFetched', categories);
  },

  async fetchPrimaryUserProfile({ commit }) {
    const profile = await api.get({ endpoint: 'user', store });
    commit('primaryUserFetched', profile);
  },

  async updatePrimaryUserProfile({ commit }, { username, name, email }) {
    try {
      const patched = await api.patch({
        endpoint: 'user',
        body: { username, name, email },
        store,
      });
      commit('primaryUserFetched', patched);
      return patched;
    } catch (e) {
      return Promise.reject(e);
    }
  },

  async uploadProfileImage({ commit }, file) {
    const formData = new FormData();
    formData.append('picture', file);

    try {
      const patched = await api.put({
        endpoint: 'user/profile-image',
        contentType: 'multipart/form-data',
        body: formData,
        store,
      });
      commit('primaryUserFetched', patched);
      return patched;
    } catch (e) {
      return Promise.reject(e);
    }
  },

  // Populate problem and solution info for a given problem
  async fetchSolution({ commit }, { category, problem }) {
    const solution = await api.get({ endpoint: `user/solution/${category}/${problem}`, store });
    // Update problem info for the problem this solution came from
    const { problem: problemFetched } = solution;
    commit('problemFetched', problemFetched);
    // Update solution for this problem
    const { code, passed } = solution;
    commit('updateSolution', { category, problem, code });
    commit('updateSolved', { problem, category, passed });
  },

  // Save a solution to a problem
  async saveSolution({ commit }, { problem, category, code }) {
    commit('beginSolutionSave');
    const { passed } = await api.put({
      endpoint: `user/solution/${category}/${problem}`,
      body: { code },
      store,
    });
    commit('updateSolution', { problem, category, code });
    commit('updateSolved', { problem, category, passed });
    commit('endSolutionSave');
  },

  async checkSolution({ commit }, { problem, category }) {
    commit('beginSolutionCheck');
    const {
      tests, passed, error, solution,
    } = await api.get({
      endpoint: `user/solution/check/${category}/${problem}`,
      store,
    });
    commit('updateSolved', { problem, category, passed });
    commit('updateTestResults', { problem, category, tests, error, code: solution.code }); // eslint-disable-line object-curly-newline
    commit('endSolutionCheck');
  },
};
