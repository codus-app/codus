export default {
  categoriesFetched(state, payload) {
    state.categories = payload;
    state.categoriesFetched = true;
  },
};
