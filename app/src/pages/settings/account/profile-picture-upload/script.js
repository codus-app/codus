export default {
  props: { url: String },

  computed: {
    hasDefaultPicture() {
      return this.url.startsWith('https://app.codus.io/static');
    },
  },
};
