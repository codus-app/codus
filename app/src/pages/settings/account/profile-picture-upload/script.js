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
    browse() { this.$refs.fileInput.click(); },

    handleFile(e) {
      const file = (e.dataTransfer || e.target).files[0];
      const reader = new FileReader();
      reader.addEventListener('load', (e2) => { this.imageDataURL = e2.target.result; });
      reader.readAsDataURL(file);

      this.dropOver = false;
    },
  },
};
