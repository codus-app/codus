export default {
  props: ['problem', 'progress'],

  computed: {
    progressStyle() {
      return {
        width: `${this.progress * 100}%`,
      };
    },
  },
};
