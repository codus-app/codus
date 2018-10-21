export default {

  // Update list of user solutions
  updateSolved(state, payload) {
    state.user.solved = payload
      .filter(s => s.passed)
      .map(s => s.problem);
  },

  // Update the list of categories
  categoriesFetched(state, payload) {
    // Is a given categoryName the name of any categories in state?
    const categoryInState = catName => state.categories.some(({ name }) => name === catName);

    // Immediately add all categories not already present in state
    state.categories.push(...payload.filter(({ name }) => !categoryInState(name)));

    // For categories we fetched that were already in state,
    payload.filter(({ name }) => categoryInState(name))
      .forEach((fetchedCategory) => {
        // Find category in state
        const category = state.categories.find(({ name }) => name === fetchedCategory.name);
        // Update some basic info Just in Case
        category.displayName = fetchedCategory.displayName;
        category.description = fetchedCategory.description;
        // Add only the problems that weren't already present in its problems array
        const problemNotInCategory = ({ name: probName }) =>
          category.problems.every(({ name }) => name !== probName);
        category.problems.push(...fetchedCategory.problems.filter(problemNotInCategory));
      });

    state.categoriesFetched = true;
  },

  // Update info for a problem when its detailed info is fetched
  // This is the main way in which a problem object in state that has the default structure (from
  // category fetch) of just { name: 'problemName' } gets expanded to include the full suite of
  // problem info.
  problemFetched(state, problem) {
    const { category: fetchedCategory } = problem;
    // Find category in Vuex store, creating if it's absent
    let category = state.categories.find(({ name }) => name === fetchedCategory.name); // Find
    if (!category) {
      category = { ...fetchedCategory, problems: [] };
      state.categories.push(category); // Add
    }
    // Find problem in category and update
    const storedProblem = category.problems.find(({ name }) => name === problem.name);
    if (storedProblem) Object.assign(storedProblem, { ...problem, category: undefined }); // Update
    else category.problems.push({ ...problem, category: undefined }); // Add
  },

  beginSolutionSave(state) { state.solutionSaveInProgress = true; },
  // Add or modify existing solution to a problem in state
  solutionUpdate(state, { category, problem, code }) {
    const solution = state.user.solutions
      .find(({ category: category2, problem: problem2 }) =>
        category === category2 && problem === problem2);
    // Mutate existing solution in vuex
    if (solution) solution.code = code;
    // Add solution
    else state.user.solutions.push({ category, problem, code });
  },
  endSolutionSave(state) { state.solutionSaveInProgress = false; },
};
