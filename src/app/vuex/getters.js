export default {
  // Get the IDs of all categories
  categoryIds: state => state.categories.map(c => c.id),
  // Get a category by its ID. If the user has been fetched, include information about which
  // of the category problems the user has successfully solved.
  getCategory: state => id => ({
    ...state.categories.find(c => c.id === id),
    solved: state.user.solutions
      .filter(({ category, passed }) => category === id && passed)
      .map(c => c.name),
  }),
};
