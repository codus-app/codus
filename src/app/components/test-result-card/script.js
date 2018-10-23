export default {
  props: {
    problem: Object, // at least parameters and resultType required
    parameters: Array,
    expectedResult: null, // null matches any type
    result: null,
    passed: Boolean, // true -> green; false -> red; undefined -> gray
  },

  data: () => ({
    expanded: false,
  }),
};
