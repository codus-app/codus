import { mapState, mapActions } from 'vuex';

export default {
  props: {
    open: Boolean,
  },

  data: () => ({
    modalHeight: '29rem',

    page: 1,
    transitionDirection: 'right',

    name: '',
    description: '',
    selectedProblems: [],
  }),

  computed: {
    ...mapState(['contentFetched']),

    modalBaseTransition() {
      return this.open
        ? 'transform .35s cubic-bezier(.175, .885, .32, 1.275), opacity .35s'
        : 'transform .2s cubic-bezier(.55, .085, .68, .53), opacity .2s cubic-bezier(.55, .085, .68, .53)';
    },
  },

  methods: {
    ...mapActions(['fetchContent']),

    updateHeight() {
      const height = `${this.$refs.pageWrapper.offsetHeight}px`;
      this.modalHeight = `calc(${height} + 6rem)`;
    },

    // TODO: bind to enter key
    next() {
      this.transitionDirection = 'right';
      if (this.page < 3) this.$nextTick(() => { this.page += 1; });
      else this.submit();
    },
    previous() {
      this.transitionDirection = 'left';
      if (this.page > 1) this.$nextTick(() => { this.page -= 1; });
    },
    submit() {
      alert('submit');
      this.$emit('close');
    },
  },

  watch: {
    // TODO: reset on close
    // TODO: close warning
    open() {
      if (this.open && !this.contentFetched) this.fetchContent();
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
