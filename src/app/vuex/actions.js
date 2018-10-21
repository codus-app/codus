import * as api from '../api';

export default {
  // Update list of solutions
  async fetchSolved({ commit }) {
    const solutions = await api.get('user/solutions');
    commit('updateSolvedList', solutions);
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
    // Update solution for this problem
    const { code, passed } = solution;
    commit('updateSolution', { category, name: problem, code });
    commit('updateSolved', { problem, category, passed });
  },

  // Save a solution to a problem
  async saveSolution({ commit }, { name, category, code }) {
    commit('beginSolutionSave');
    // TODO: get new saved status from API response
    await api.put(`solution/${category}/${name}`, { code });
    commit('updateSolution', { name, category, code });
    commit('endSolutionSave');
  },
};
