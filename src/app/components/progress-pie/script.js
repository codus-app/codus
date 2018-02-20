export default {
  props: {
    colors: Array,
    background: String,
    gradientAngle: { type: Number, default: 135 },
    progress: { type: Number, default: 0 },
  },

  methods: {
    update() {
      const progressAngle = this.progress * 360;
      if (progressAngle <= 180) { // Only right side needs to be adjusted
        this.$refs.rightFill.style.transform = `rotate(${progressAngle}deg)`;
        this.$refs.rightFill.style.backgroundImage = `linear-gradient(${this.gradientAngle - progressAngle}deg, ${this.colors[0]}, ${this.colors[1]})`;
        this.$refs.leftFill.style.transform = 'rotate(0deg)';
      } else {
        this.$refs.rightFill.style.transform = 'rotate(180deg)';
        this.$refs.rightFill.style.backgroundImage = `linear-gradient(${this.gradientAngle - 180}deg, ${this.colors[0]}, ${this.colors[1]})`;
        this.$refs.leftFill.style.transform = `rotate(${progressAngle - 180}deg)`;
        this.$refs.leftFill.style.backgroundImage = `linear-gradient(${this.gradientAngle - (progressAngle - 180)}deg, ${this.colors[0]}, ${this.colors[1]})`;
      }
    },
  },

  watch: {
    progress() { this.update(); },
  },

  mounted() {
    this.update();
  },
};
