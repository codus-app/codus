export default {
  props: { url: String },

  data: () => ({
    modalOpen: false, // Should the upload window be open or closed?
    dropOver: false, // Is the user dragging a file over the upload window?
    // These are reset when the upload window closes, so they only represent the current "session"
    hasDragged: false, // Has the user dragged a file over the upload window in the past?
    dropped: false, // Has the user dropped a file into the upload window?
  }),

  computed: {
    hasDefaultPicture() {
      return this.url.startsWith('https://app.codus.io/static');
    },
  },
};
