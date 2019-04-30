export default {
  props: {
    name: String,
    description: String,
  },

  computed: {
    valid() {
      return this.name.length > 0 && this.name.length < 40;
    },
  },

  watch: {
    valid() { this.$emit('validationchange', this.valid); },
  },
};
