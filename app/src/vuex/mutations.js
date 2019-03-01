import Vue from 'vue';

export default {

  // Update list of user solutions
  updateSolvedList(state, payload) {
    state.user.solved = payload
      .filter(s => s.passed)
      .map(s => s.problem);
  },

  // Update list of problems for which the user has begun a solution
  updateSolutionsBegunList(state, payload) {
    state.user.solutionsBegun = payload.map(s => s.problem);
  },

  // Update the solved array to reflect the solved state of a given problem
  updateSolved(state, { problem, category, passed }) {
    if (state.user.solved === null) throw new Error('Must dispatch fetchSolved action before mutating the solved state of any problem');

    const probIndex = state.user.solved
      .findIndex(({ name, category: cname }) => name === problem && cname === category);
    // We need to take action if the problem isn't in the solved array but should be
    if (passed) {
      if (probIndex === -1) state.user.solved.push({ name: problem, category });
    // ... or if the problem is in the solved array when it sholudn't be
    } else if (probIndex !== -1) state.user.solved.splice(probIndex, 1);
  },

  // Update the list of categories
  contentFetched(state, payload) {
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
        const problemNotInCategory = ({ name: probName }) => category.problems
          .every(({ name }) => name !== probName);
        category.problems.push(...fetchedCategory.problems.filter(problemNotInCategory));
      });

    state.contentFetched = true;
  },

  // Update a user profile when the API response returns
  primaryUserFetched(state, payload) {
    state.user.profile = { ...state.user.profile, ...payload };
    // Also update the copy of the object that's stored in the cache of user profiles
    const { username } = state.user.profile;
    Vue.set(state.users, username, { ...state.users[username], ...payload });
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


  beginSolutionSave(state) { state.user.solutionSaveInProgress = true; },
  // Add or modify existing solution to a problem in state
  updateSolution(state, { category, problem, code }) {
    const solution = state.user.solutions
      .find(({ category: category2, problem: problem2 }) => category === category2 && problem === problem2); // eslint-disable-line max-len
    // Mutate existing solution in vuex
    if (solution) solution.code = code;
    // Add solution
    else state.user.solutions.push({ category, problem, code });
  },
  endSolutionSave(state) { state.user.solutionSaveInProgress = false; },


  beginSolutionCheck(state) { state.solutionCheckInProgress = true; },
  updateTestResults(state, { category, problem, tests, error = null, code }) { // eslint-disable-line object-curly-newline, max-len
    state.testResults = {
      ...state.testResults,
      [`${category}/${problem}`]: { tests, code, error },
    };
  },
  endSolutionCheck(state) { state.solutionCheckInProgress = false; },

  userFetched(state, payload) {
    Vue.set(state.users, payload.username, { ...state.users[payload.username], ...payload });
  },
};
