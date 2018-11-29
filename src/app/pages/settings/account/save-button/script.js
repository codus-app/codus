export default {
  data: () => ({
    loading: false,
  }),

  props: {
    onClick: Function,
    enabled: Boolean,
  },

  methods: {
    async click() {
      if (!this.loading) {
        this.loading = true;
        const res = await this.onClick();
        this.$emit('completed', res);
        this.loading = false;
      }
    },
  },
};
