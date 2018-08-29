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

  beginSolutionSave(state) { state.solutionSaveInProgress = true; },
  solutionSaved(state, { category, name, code }) {
    const solution = state.user.solutions
      .find(({ category: category2, name: name2 }) => category === category2 && name === name2);
    // Mutate existing solution in vuex
    if (solution) solution.code = code;
    // Add solution
    else state.user.solutions.push({ category, name, code });

    state.solutionSaveInProgress = false;
  },
};
