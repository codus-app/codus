export default {
  props: { url: String, serverError: String },

  data: () => ({
    dropOver: false, // Is the user dragging a file over the upload area?

    imageDataURL: '',
    clientError: '',
  }),

  computed: {
    hasDefaultPicture() {
      return this.url.startsWith('https://app.codus.io/static');
    },

    pictureClass() {
      if (this.errorMessage) return 'error';
      if (this.dropOver) return 'dragging';
      if (this.imageDataURL.length) return 'dropped';
      return '';
    },

    errorMessage() {
      return this.clientError || this.serverError;
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

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1000 * 1000; // 5MB
      const typeValid = allowedTypes.includes(file.type);
      const sizeValid = file.size < maxSize;

      if (!typeValid) {
        this.clientError = 'Image must be a JPEG, PNG, or GIF';
      } else if (!sizeValid) {
        this.clientError = 'Image size must be less than 5MB';
      } else {
        // Pass file to parent
        this.$emit('file', file);

        // Read file to data URL for display pre-upload
        const reader = new FileReader();
        reader.addEventListener('load', (e2) => { this.imageDataURL = e2.target.result; });
        reader.readAsDataURL(file);

        this.dropOver = false;
      }
    },
  },

  watch: {
    // A change in passed URL signifies a successful image upload. Remove the image displayed from
    // the data URL once the upload has finished, allowing the uploaded copy of the image to display
    // instead.
    url() { this.imageDataURL = ''; },
    // An error message indicates an error has occurred. Clear displayed new image
    errorMessage() { this.imageDataURL = ''; },
  },

  created() {
    this.$on('clearError', () => { this.clientError = ''; });
  },
};
