import { mapState } from 'vuex';

export default {
  props: { selected: Array },

  computed: {
    ...mapState(['categories']),
  },

  methods: {
    // Fix for jerky scroll on bad window sizes: set the height of the scroll content to an integer
    // pixel value
    setScrollHeight() {
      const parent = this.$refs.scrollContentContainer;
      const height = parent.lastElementChild.getBoundingClientRect().bottom
        - parent.firstElementChild.getBoundingClientRect().top;
      parent.style.height = `${Math.ceil(height)}px`;
    },
  },

  mounted() {
    this.$nextTick(this.setScrollHeight);
    window.addEventListener('resize', this.setScrollHeight);
    this.$watch('selected', this.setScrollHeight);
  },
  destroyed() { window.removeEventListener('resize', this.setScrollHeight); },

  components: {
    'proceed-button': require('../../proceed-button/proceed-button.vue').default,
  },
};
