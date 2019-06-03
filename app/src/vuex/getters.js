export default {
  // Return id token information, adding fetched profile information when it becomes available
  profile: state => Object.assign({}, state.auth.profile, state.user.profile),
  // Return role of current user, "instructor" or "student"
  role: state => state.user.role,
  // Get the IDs of all categories
  categoryIds: state => state.categories.map(c => c.name),
  // Get a category by its ID. If the user has been fetched, include information about which
  // of the category problems the user has successfully solved.
  getCategory: state => name => ({
    ...state.categories.find(c => c.name === name),
    solved: (state.user.solved || [])
      .filter(({ category }) => category === name)
      .map(c => c.name),
  }),

  getProblem: state => (searchCategory, searchProblem) => state.categories
    .find(c => c.name === searchCategory)
    .problems
    .find(p => p.name === searchProblem),

  getSolution: state => (searchCategory, searchProblem) => state.user.solutions
    .find(({ category, problem }) => category === searchCategory && problem === searchProblem),

  isSolved: state => (searchCategory, searchProblem) => (state.user.solved || [])
    .findIndex(({ category, name }) => category === searchCategory && name === searchProblem)
    !== -1,

  isSolutionBegun: state => (searchCategory, searchProblem) => (state.user.solutionsBegun || [])
    .findIndex(({ category, name }) => category === searchCategory && name === searchProblem)
    !== -1,

  isCategoryComplete: (state, getters) => (searchCategory) => {
    const cat = getters.getCategory(searchCategory);
    return !!cat.solved.length && cat.solved.length === cat.problems.length;
  },

  getTestResults: state => (category, problem) => state.testResults[`${category}/${problem}`] || { tests: [], code: null, error: null },

  getUser: state => username => state.users[username] || {},

  getNextUnsolvedProblem: (state, getters) => (category, problem) => {
    // Aggregate problems into ordered list of { category, name, solved }
    const allProblems = state.categories.flatMap(c => c.problems.map(p => ({
      category: c.name,
      name: p.name,
      solved: getters.isSolved(c.name, p.name),
    })));
    // Find the problem in question
    const index = allProblems
      .findIndex(({ category: category2, name }) => category2 === category && name === problem);
    // All problems after, then all problems before
    const nextProblems = [...allProblems.slice(index + 1), ...allProblems.slice(0, index)];
    // First unsolved; null if all are solved
    return nextProblems.filter(p => !p.solved)[0] || null;
  },
};
