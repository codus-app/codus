export default {
  props: {
    value: String,

    title: String,
    placeholder: String,
    disabled: Boolean,
    message: String,
    status: {
      type: String,
      validator: value => ['neutral', 'success', 'failure', 'loading'].includes(value),
      default: 'neutral',
    },
    charLimit: { type: Number, default: null },
  },

  computed: {
    charsRemaining() {
      return this.charLimit != null
        ? this.charLimit - this.value.length
        : Infinity;
    },

    charsValid() { return this.charsRemaining >= 0; },
  },

  methods: {
    onInput(e) { this.$emit('input', e.target.value); },
  },
};
