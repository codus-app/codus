import * as api from '../api';

export default {
  async fetchCategories({ commit }) {
    const categories = await api.get('/categories');
    commit('categoriesFetched', categories);
  },
};
