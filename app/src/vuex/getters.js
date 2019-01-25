export default {
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

  getTestResults: state => (category, problem) => state.testResults[`${category}/${problem}`] || { tests: [], code: null, error: null },
};
