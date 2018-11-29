export default {
  data: () => ({
    loading: false,
  }),

  props: {
    onClick: Function,
    enabled: { type: Boolean, default: true },
    text: { type: String, default: 'Save' },
  },

  methods: {
    async click() {
      if (!this.loading && this.enabled) {
        this.loading = true;
        this.onClick()
          .then(() => { this.loading = false; })
          .catch((e) => { this.loading = false; this.$emit('error', e); });
      }
    },
  },
};
