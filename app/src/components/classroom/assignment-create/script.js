import { mapState, mapActions } from 'vuex';


const baseState = {
  page: 1,
  transitionDirection: 'right',

  name: '',
  description: '',
  selectedProblems: [],

  date: new Date(undefined),
};


export default {
  props: {
    open: Boolean,
  },

  data: () => ({
    modalHeight: '29rem',
    oldTitle: '',
    ...baseState,
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
    // TODO: close warning
    open() {
      if (this.open) {
        if (!this.contentFetched) this.fetchContent();

        this.oldTitle = document.title;
        document.title = 'Create assignment | Codus';

        this.$el.getElementsByTagName('input')[0].focus();
      } else {
        setTimeout(() => Object.assign(this, baseState), 200);
        document.title = this.oldTitle;
      }

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
