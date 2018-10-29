export default {
  data: () => ({
    windowSize: [window.innerWidth, window.innerHeight],
    expanded: false,
    mounted: false,
  }),

  computed: {
    childrenHeight() {
      (() => {})(this.windowSize);
      return (this.expanded && this.mounted)
        ? `${this.$refs.children.getBoundingClientRect().height}px`
        : 0;
    },
  },

  methods: { onResize() { this.windowSize = [window.innerWidth, window.innerHeight]; } },

  created() { window.addEventListener('resize', this.onResize); },
  mounted() { this.mounted = true; },
  destroyed() { window.removeEventListener('resize', this.onResize); },
};
