import { delay } from '../../../../helpers';

export default {
  props: { url: String },

  data: () => ({
    modalOpen: false, // Should the upload window be open or closed?
    dropOver: false, // Is the user dragging a file over the upload window?
    // These are reset when the upload window closes, so they only represent the current "session"
    hasDragged: false, // Has the user dragged a file over the upload window in the past?
    dropped: false, // Has the user dropped a file into the upload window?

    imageDataURL: '',
  }),

  computed: {
    hasDefaultPicture() {
      return this.url.startsWith('https://app.codus.io/static');
    },
  },

  methods: {
    handleDragLeave() {
      this.dropOver = false;
      if (this.modalOpenedFromDrag) return this.reset();
      return undefined;
    },

    handleDrop(e) {
      if (this.dropped) return;

      this.dropped = true;

      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', (e2) => { this.imageDataURL = e2.target.result; });
      reader.readAsDataURL(file);
    },

    reset() {
      Object.assign(this, {
        modalOpen: false,
        dropOver: false,
        dropped: false,
        hasDragged: false,
      });

      this.$nextTick().then(() => {
        // Reset imageDataUrl either after 500ms or when the modal is re-opened
        Promise.race([
          delay(500),
          new Promise((resolve) => { this.$once('modalOpen', resolve); }),
        ])
          .then(() => { this.imageDataURL = ''; });
      });
    },
  },

  watch: {
    modalOpen(open) { this.$emit(open ? 'modalOpen' : 'modalClose'); },
  },
};
