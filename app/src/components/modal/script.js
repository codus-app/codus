export default {
  props: ['bgcolor'],
  methods: {
    bgClickClose($event) {
      if ($event.target === this.$refs['modal-bg']) {
        this.$emit('close');
      }
    },
  },
};
