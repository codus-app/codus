import * as api from '../../api';

export default {
  props: ['categoryId'],
  data: () => ({
    name: this.categoryId, // Will be replaced with readable name after first HTTP request completes
    description: '',

    completion: 0,

    problems: [], // All problems in the category
    displayProblems: [], // All problems that fit on the unexpanded card
    remainder: 0, // The number of problems not displayed
    invisible: true, // Should the problems be visible yet?
    expanded: false, // Should the "expanded" view with all problems be open?

    mounted: false,
  }),

  mounted() { this.mounted = true; },

  created() {
    this.fetchData();

    window.addEventListener('resize', () => this.layout());
  },

  methods: {
    async fetchData() {
      const category = await api.get(`/categoryOverview/${this.categoryId}`);

      this.name = category.readableName;
      this.description = category.description;

      const problemNames = category.problems;
      const solvedNames = category.solutions.filter(s => s.passed).map(s => s.name);

      problemNames.forEach(p => this.problems.push({ name: p, passed: solvedNames.includes(p) }));

      this.completion = solvedNames.length / problemNames.length;

      this.layout();
    },

    layout() {
      this.invisible = true;

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
        this.remainder = this.problems.length - this.displayProblems.length;
        this.invisible = false;
      });
    },
  },

  watch: {
    expanded() { this.$emit('expanded', this.expanded); },
  },

  computed: {
    positionStyles() {
      // Default: centered on both axes

      let top = '50%';
      let left = '50%';
      let translateX = '-50%';
      let translateY = '-50%';

      // Adjust if on edges of container

      if (this.mounted) {
        const bounds = this.$el.parentElement.getBoundingClientRect();
        const collapsedCardBounds = this.$el.getBoundingClientRect();
        // Pin to left edge
        if (collapsedCardBounds.left <= bounds.left + 5) { left = '0px'; translateX = '0px'; }
        // Pin to right edge
        if (collapsedCardBounds.right >= bounds.right - 5) { left = '100%'; translateX = '-100%'; }
        // Pin to top edge
        if (collapsedCardBounds.top <= bounds.top + 5) { top = '0px'; translateY = '0px'; }
        // Pin to bottom edge
        if (collapsedCardBounds.bottom >= bounds.bottom - 5) { top = '100%'; translateY = '-100%'; }
      }


      return {
        top,
        left,
        transform: `translate(${translateX}, ${translateY})`,
      };
    },
  },
};
