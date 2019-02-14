export default {
  props: { url: String },

  data: () => ({
    modalOpen: false,
    dropState: '',
  }),

  computed: {
    hasDefaultPicture() {
      return this.url.startsWith('https://app.codus.io/static');
    },
  },
};
