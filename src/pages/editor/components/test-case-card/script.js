export default {
  props: {
    parameters: Array,
    expectedResult: null, // null matches any type
    result: null,
    passed: null, // true -> green; false -> red; undefined -> gray
    error: String,
  },

  data: () => ({ expanded: false }),
  created() { this.expanded = typeof this.passed === 'undefined' ? false : !this.passed; },

  watch: {
    // Expand a card if it becomes failing, and collapse if it becomes passing
    passed(passed, oldState) {
      // Expand when we start failing
      if (passed === false && oldState !== false && !this.error) this.expanded = true;
      // Collapse when we start passing
      if (passed && !oldState) this.expanded = false;
    },
  },
};
