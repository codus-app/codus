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

  getSolution: state => (searchCategory, searchName) => state.user.solutions
    .find(({ category, name }) => category === searchCategory && name === searchName),
};
