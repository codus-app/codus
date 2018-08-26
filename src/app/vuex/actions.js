import * as api from '../api';

export default {
  // Update basic user info
  async fetchUser({ commit }) {
    const user = await api.get('/user');
    commit('userFetched', user);
  },
  // Update basic info about category listings
  async fetchCategories({ commit }) {
    const categories = await api.get('/categories');
    commit('categoriesFetched', categories);
  },
};
