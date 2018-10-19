import * as api from '../api';

export default {
  // Update list of solutions
  async fetchSolved({ commit }) {
    const solutions = await api.get('user/solutions');
    commit('updateSolved', solutions);
  },

  // Update basic info about category listings
  async fetchCategories({ commit }) {
    const categories = await api.get('categories');
    commit('categoriesFetched', categories);
  },


  // Populate problem and solution info for a given problem
  async fetchSolution({ commit }, { category, problem }) {
    const solution = await api.get(`user/solution/${category}/${problem}`);
    // Update problem info for the problem this solution came from
    const { problem: problemFetched } = solution;
    commit('problemFetched', problemFetched);
    // TODO: Update solution to this problem
  },

  // Save a solution to a problem
  async saveSolution({ commit }, { name, category, code }) {
    commit('beginSolutionSave');
    await api.put(`solution/${category}/${name}`, { code });
    commit('solutionSaved', { name, category, code });
  },
};
