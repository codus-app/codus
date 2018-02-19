import * as api from '../../api';

export default {
  props: ['categoryId'],
  data: () => ({
    name: this.categoryId, // Will be replaced with readable name after first HTTP request completes
    description: '',

    problems: [], // All problems in the category
    displayProblems: [], // All problems that fit on the unexpanded card
    invisible: true, // Should the problems be visible yet?
  }),

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      const category = await api.get(`/categoryOverview/${this.categoryId}`).then(r => r.json());

      this.name = category.readableName;
      this.description = category.description;

      const problemNames = category.problems;
      const solvedNames = category.solutions.filter(s => s.passed).map(s => s.name);

      problemNames.forEach(p => this.problems.push({ name: p, passed: solvedNames.includes(p) }));

      this.displayProblems = this.problems;

      // After items have rendered
      setTimeout(() => {
        // An array containing the Y position of each problem's link
        const renderYs = this.problems.map(p => this.$refs[p.name][0].$el.offsetTop);
        // Each unique problem Y position; the Y position of each row of links
        const rowYs = renderYs.filter((y, i, arr) => arr.indexOf(y) === i);

        // Need to hide some if there are more than 2 rwos
        if (rowYs.length > 2) {
          // Cut to the first two rows of problems and then remove the final problem
          const first2Rows = this.displayProblems.filter((prob, i) => renderYs[i] < rowYs[2]);
          this.displayProblems = first2Rows;
          this.displayProblems.pop();
        }
        this.invisible = false;
      });
    },
  },
};
