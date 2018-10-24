export default {
  props: {
    parameters: Array,
    expectedResult: null, // null matches any type
    result: null,
    passed: Boolean, // true -> green; false -> red; undefined -> gray
  },

  data: () => ({
    expanded: false,
  }),
};
