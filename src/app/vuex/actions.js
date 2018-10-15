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

  // Save a solution to a problem
  async saveSolution({ commit }, { name, category, code }) {
    commit('beginSolutionSave');
    await api.put(`solution/${category}/${name}`, { code });
    commit('solutionSaved', { name, category, code });
  },
};
