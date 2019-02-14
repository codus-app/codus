export default {
  props: { url: String },

  data: () => ({
    modalOpen: false,
  }),

  computed: {
    hasDefaultPicture() {
      return this.url.startsWith('https://app.codus.io/static');
    },
  },
};
