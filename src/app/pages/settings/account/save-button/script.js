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
        const res = await this.onClick();
        this.$emit('completed', res);
        this.loading = false;
      }
    },
  },
};
