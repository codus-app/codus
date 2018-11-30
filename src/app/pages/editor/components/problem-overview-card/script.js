export default {
  props: ['problem', 'progress'],

  computed: {
    progressStyle() {
      return {
        width: `${this.progress * 100}%`,
        background: `linear-gradient(90deg, #4DFB9B 0%, #1DB965 ${(1 / this.progress) * 100}%)`,
      };
    },
  },
};
