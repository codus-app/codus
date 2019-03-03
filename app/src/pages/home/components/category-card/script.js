import { mapGetters } from 'vuex';

export default {
  props: ['categoryId', 'bounds', 'scroll'],
  data: () => ({
    displayProblems: [], // All problems that fit on the unexpanded card
    remainder: 0, // The number of problems not displayed
    invisible: true, // Should the problems be visible yet?
    expanded: false, // Should the "expanded" view with all problems be open?

    mounted: false,
    windowWidth: null,
  }),

  mounted() { this.mounted = true; this.layout(); },

  created() {
    this.layout = this.layout.bind(this);
    window.addEventListener('resize', this.layout);
  },

  methods: {

    layout() {
      this.windowWidth = window.innerWidth;

      this.invisible = true;

      this.displayProblems = this.category.problems;

      // After items have rendered
      this.$nextTick(() => {
        // An array containing the Y position of each problem's link
        const renderYs = this.category.problems
          .map(({ name }) => this.$refs[name][0].$el.offsetTop);
        // Each unique problem Y position; the Y position of each row of links
        const rowYs = renderYs.filter((y, i, arr) => arr.indexOf(y) === i);

        // Need to hide some if there are more than 2 rwos
        if (rowYs.length > 2) {
          // Cut to the first two rows of problems and then remove the final problem
          const first2Rows = this.displayProblems.filter((prob, i) => renderYs[i] < rowYs[2]);
          this.displayProblems = first2Rows;
          this.displayProblems.pop();
        }
        this.remainder = this.category.problems.length - this.displayProblems.length;
        this.completion = this.category.solved.length / this.category.problems.length;
        this.invisible = false;
      });
    },
  },

  watch: {
    expanded() { this.$emit('expanded', this.expanded); },
    category() { this.layout(); },
  },

  computed: {
    ...mapGetters(['getCategory']),

    category() { return this.getCategory(this.categoryId); },

    positionStyles() {
      // Make sure it recomputes on window resize
      (() => {})(this.windowWidth, this.scroll);

      // Default: centered on both axes

      let top = '50%';
      let left = '50%';
      let translateX = '-50%';
      let translateY = '-50%';

      // Adjust if on edges of container

      if (this.mounted) {
        const collapsedCardBounds = this.$el.getBoundingClientRect();
        // Pin to left edge
        if (collapsedCardBounds.left <= this.bounds.left + 5) { left = '0px'; translateX = '0px'; }
        // Pin to right edge
        if (collapsedCardBounds.right >= this.bounds.right - 5) { left = '100%'; translateX = '-100%'; }
        // Pin to top edge
        if (collapsedCardBounds.top <= this.bounds.top + 5) { top = '0px'; translateY = '0px'; }
        // Pin to bottom edge
        if (collapsedCardBounds.bottom >= this.bounds.bottom - 5) { top = '100%'; translateY = '-100%'; }
      }


      return {
        top,
        left,
        transform: `translate(${translateX}, ${translateY})`,
      };
    },
  },

  destroyed() { window.removeEventListener('resize', this.layout); },

  components: {
    'problem-link': require('./problem-link').default,
  },
};
