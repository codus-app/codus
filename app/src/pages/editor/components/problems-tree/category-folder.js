export default {
  props: { active: Boolean, allSolved: Boolean },

  data: () => ({
    windowSize: [window.innerWidth, window.innerHeight],
    expanded: false,
    mounted: false,
    transitionDuration: '0.35s',
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

  created() {
    if (this.active) {
      this.transitionDuration = '0s';
      this.expanded = true;
      setTimeout(() => { this.transitionDuration = '0.35s'; }, 500);
    }
    this.expanded = this.active;
    window.addEventListener('resize', this.onResize);
  },
  mounted() {
    setTimeout(() => { this.mounted = true; }, window.safari ? 500 : 0);
  },
  destroyed() { window.removeEventListener('resize', this.onResize); },
};
