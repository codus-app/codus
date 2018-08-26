export default {
  // Get the IDs of all categories
  categoryIds: state => state.categories.map(c => c.id),
};
