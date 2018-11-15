import * as api from '../api';
import store from '.';

export default {
  // Update list of solutions
  async fetchSolved({ commit }) {
    const solutions = await api.get({ endpoint: 'user/solutions', store });
    commit('updateSolvedList', solutions);
  },

  // Update basic info about category listings
  async fetchCategories({ commit }) {
    const categories = await api.get({ endpoint: 'categories', store });
    commit('categoriesFetched', categories);
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
