export default {
  props: { open: Boolean, classroom: Object },

  data: () => ({
    page: 'list', // One of 'list', 'email', 'code', or 'link'
    modalHeight: 'calc(200px + 2rem)',
    windowSize: [window.innerWidth, window.innerHeight],
  }),

  computed: {
    modalBaseTransition() {
      return this.open
        ? 'transform .35s cubic-bezier(.175, .885, .32, 1.275), opacity .35s'
        : 'transform .2s cubic-bezier(.55, .085, .68, .53), opacity .2s cubic-bezier(.55, .085, .68, .53)';
    },
  },

  methods: {
    updateHeight() {
      const height = `${this.$refs.pageWrapper.offsetHeight}px`;
      this.modalHeight = `calc(${height} + 2rem)`;
    },
  },

  mounted() {
    this.$nextTick(this.updateHeight);
    window.addEventListener('resize', this.updateHeight);
    this.$watch('page', async () => {
      await this.$nextTick(); // eslint-disable-line no-await-in-loop
      this.updateHeight();
    });
  },
  destroyed() { window.removeEventListener('resize', this.updateHeight); },
};
