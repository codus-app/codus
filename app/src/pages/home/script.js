import debounce from 'debounce';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    cardsFaded: false,

    resizeListener: undefined,
    windowSize: [null, null],
    scrollPos: 0,
    mounted: false,
  }),

  created() {
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);

    if (!this.categoriesFetched) this.fetchCategories();
  },

  mounted() { this.mounted = true; },

  methods: {
    ...mapActions(['fetchCategories']),

    closeAll() {
      this.$children.forEach((c) => { c.expanded = false; });
    },

    onResize() { this.windowSize = [window.innerWidth, window.innerHeight]; },
    onScroll: debounce(function onScroll(e) { this.scrollPos = e.target.scrollTop; }, 100),
  },

  computed: {
    ...mapState(['categoriesFetched']),
    ...mapGetters(['categoryIds']),

    cardBounds() {
      // Recompute on resize
      (() => {})(this.windowSize);

      if (!this.mounted) return {}; // eslint-disable-line no-underscore-dangle

      const outerBounds = this.$el.getBoundingClientRect();
      const style = getComputedStyle(this.$el);

      return {
        top: outerBounds.top + parseFloat(style.paddingTop),
        right: outerBounds.right - parseFloat(style.paddingRight),
        bottom: outerBounds.bottom - parseFloat(style.paddingBottom),
        left: outerBounds.left + parseFloat(style.paddingLeft),
      };
    },
  },

  destroyed() { window.removeEventListener('resize', this.onResize); },
};
