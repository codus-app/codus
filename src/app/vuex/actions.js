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
    commit('updateSolution', { category, problem, code });
    commit('updateSolved', { problem, category, passed });
  },

  // Save a solution to a problem
  async saveSolution({ commit }, { problem, category, code }) {
    commit('beginSolutionSave');
    const { passed } = await api.put(`user/solution/${category}/${problem}`, { code });
    commit('updateSolution', { problem, category, code });
    commit('updateSolved', { problem, category, passed });
    commit('endSolutionSave');
  },

  async checkSolution({ commit }, { problem, category }) {
    commit('beginSolutionCheck');
    const { tests, passed, solution } = await api.get(`user/solution/check/${category}/${problem}`);
    commit('updateSolved', { problem, category, passed });
    commit('updateTestResults', { problem, category, tests, code: solution.code }); // eslint-disable-line object-curly-newline
    commit('endSolutionCheck');
  },
};
