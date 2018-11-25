export default {
  props: {
    value: String,

    title: String,
    placeholder: String,
    message: String,
    status: {
      type: String,
      validator: value => ['neutral', 'success', 'failure', 'loading'].includes(value),
      default: 'neutral',
    },
  },

  methods: {
    onInput(e) { this.$emit('input', e.target.value); },
  },
};
