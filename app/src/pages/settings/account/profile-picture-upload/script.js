export default {
  props: { url: String },

  data: () => ({
    dropOver: false, // Is the user dragging a file over the upload area?

    imageDataURL: '',
  }),

  computed: {
    hasDefaultPicture() {
      return this.url.startsWith('https://app.codus.io/static');
    },
  },

  methods: {
    browse() {
      this.dropOver = true;
      this.$refs.fileInput.click();
      // Listen to events on body to try to detect when "cancel" has been clicked on file input and
      // focus has returned to the document
      const eventsToListen = ['onfocus', 'onmouseenter'];
      const eventListener = () => {
        eventsToListen.forEach((ename) => { document.body[ename] = null; });
        this.dropOver = false;
      };
      eventsToListen.forEach((ename) => { document.body[ename] = eventListener; });
    },

    handleFile(e) {
      const file = (e.dataTransfer || e.target).files[0];

      this.$emit('file', file);

      // Read file to data URL for display pre-upload
      const reader = new FileReader();
      reader.addEventListener('load', (e2) => { this.imageDataURL = e2.target.result; });
      reader.readAsDataURL(file);

      this.dropOver = false;
    },
  },

  watch: {
    // A change in passed URL signifies a successful image upload. Remove the image displayed from
    // the data URL once the upload has finished.
    url() { this.imageDataURL = ''; },
  },
};
