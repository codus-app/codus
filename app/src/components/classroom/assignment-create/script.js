export default {
  props: {
    open: Boolean,
  },

  data: () => ({
    modalHeight: '29rem',

    page: 1,

    pageValidation: {
      1: false,
      2: false,
      3: false,
    },

    name: '',
    description: '',
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
      this.modalHeight = `calc(${height} + 6rem)`;
    },

    next() {
      if (this.page < 3) this.page += 1;
      else this.submit();
    },
    submit() {
      alert('submit');
      this.$emit('close');
    },
  },

  mounted() {
    this.$nextTick(this.updateHeight);
    window.addEventListener('resize', this.updateHeight);
    this.$watch('page', () => this.$nextTick().then(this.updateHeight));
  },
  destroyed() { window.removeEventListener('resize', this.updateHeight); },

  components: {
    'page-1': require('./pages/1/page-1.vue').default,
    'page-2': require('./pages/2/page-2.vue').default,
    'page-3': require('./pages/3/page-3.vue').default,
    'proceed-button': require('./proceed-button/proceed-button.vue').default,
  },
};
