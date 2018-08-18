import debounce from 'debounce';
import * as api from '../../api';

export default {
  data: () => ({
    categories: [],
    cardsFaded: false,

    resizeListener: undefined,
    windowSize: [null, null],
    scrollPos: 0,
  }),

  created() {
    this.fetchData();

    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);
  },

  methods: {
    async fetchData() {
      const categories = await api.get('/categories');
      this.categories = categories.map(c => c.id);
    },

    closeAll() {
      this.$children.forEach((c) => { c.expanded = false; });
    },

    onResize() { this.windowSize = [window.innerWidth, window.innerHeight]; },
    onScroll: debounce(function onScroll(e) { this.scrollPos = e.target.scrollTop; }, 100),
  },

  computed: {
    cardBounds() {
      // Recompute on resize
      (() => {})(this.windowSize);

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
