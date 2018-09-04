export default {
  props: {
    open: { type: Boolean },
    onCancel: { type: Function, default: this.close },
    onSubmit: Function,
  },

  methods: {
    close() { this.$emit('close'); },
  },
};
