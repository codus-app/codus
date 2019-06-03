export default {
  props: { active: Boolean, allSolved: Boolean },

  data: () => ({
    expanded: false,

    childrenHeight: 0,
    transitionDuration: 350,
  }),

  methods: {
    recomputeHeight() {
      this.childrenHeight = this.expanded
        ? `${this.$refs.children.getBoundingClientRect().height}px`
        : 0;
    },

    expand() { this.expanded = true; },
    collapse() { this.expanded = false; },
  },

  watch: {
    expanded() {
      setTimeout(() => this.$emit('change'), this.transitionDuration);
    },
  },

  async mounted() {
    this.recomputeHeight();
    window.addEventListener('resize', this.recomputeHeight);

    this.expanded = this.active;

    // Re-evaluate size when 'expanded' changes and when children element resizes
    this.$watch('expanded', this.recomputeHeight);
    new ResizeObserver(this.recomputeHeight)
      .observe(this.$refs.children);
  },
  destroyed() { window.removeEventListener('resize', this.onResize); },
};
