export default {
  props: {
    open: { type: Boolean, required: true },
    wide: { type: Boolean, default: false },
    noMargin: { type: Boolean, default: false },
    fadeColor: { type: String, default: 'rgba(0, 0, 0, 0.25)' },
    modalStyle: { type: Object, default: () => ({}) },
    scrimStyle: { type: Object, default: () => ({}) },
  },

  data: () => ({ $el2: null }),
  mounted() { this.$nextTick(() => { this.$el2 = this.$refs.root; }); },
};
