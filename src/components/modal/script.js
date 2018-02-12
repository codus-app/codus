export default {
  props: {
    bgcolor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.75)',
    },
  },

  data: () => ({
    shown: false,
  }),

  computed: {
    style() {
      return { backgroundColor: this.bgcolor };
    },
  },

  methods: {
    show() {
      this.shown = true;
      this.$emit('show');
    },
    close() {
      this.shown = false;
      this.$emit('close');
    },
    toggle() {
      if (this.shown) this.close();
      else this.show();
    },
  },
};
