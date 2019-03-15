import debounce from 'debounce';
import { mapState, mapGetters, mapActions } from 'vuex';
import { delay } from '../../helpers';

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

    if (!this.contentFetched) this.fetchContent();
  },

  async mounted() {
    this.mounted = true;
    while (!this.$refs['cards-scroll'].$el.SimpleBar) { await delay(100); } // eslint-disable-line no-await-in-loop
    this.$refs['cards-scroll'].$el.SimpleBar.getScrollElement().addEventListener('scroll', debounce((e) => {
      this.scrollPos = e.target.scrollTop;
    }, 100));
  },

  methods: {
    ...mapActions(['fetchContent']),

    closeAll() {
      this.$refs.cards.forEach((c) => { c.expanded = false; });
    },

    onResize() { this.windowSize = [window.innerWidth, window.innerHeight]; },
  },

  computed: {
    ...mapState(['contentFetched']),
    ...mapGetters(['categoryIds']),

    cardBounds() {
      // Recompute on resize
      (() => {})(this.windowSize);

      if (!this.mounted) return {};

      const paddingEl = this.$refs['cards-container'];
      const outerBounds = this.$el.getBoundingClientRect();
      const style = getComputedStyle(paddingEl);

      return {
        top: outerBounds.top + parseFloat(style.paddingTop),
        right: outerBounds.right - parseFloat(style.paddingRight),
        bottom: outerBounds.bottom - parseFloat(style.paddingBottom),
        left: outerBounds.left + parseFloat(style.paddingLeft),
      };
    },
  },

  destroyed() { window.removeEventListener('resize', this.onResize); },

  components: {
    'category-card': require('./components/category-card/category-card.vue').default,
  },
};
