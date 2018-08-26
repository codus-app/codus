export default {
  // Update basic user info
  userFetched(state, payload) {
    state.user = { ...state.user, ...payload };
    state.userFetched = true;
  },
  // Update the list of categories
  categoriesFetched(state, payload) {
    state.categories = payload;
    state.categoriesFetched = true;
  },
};
