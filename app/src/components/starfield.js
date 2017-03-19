export default {
  template: '<canvas ref="stars"></canvas>',
  props: {
    // Number of stars in the simulation
    starCount: {
      type: Number,
      default: 2000,
    },
    // Speed at which the stars move
    speed: {
      type: Number,
      default: 1,
    },
    // Simulation frames per second
    fps: {
      type: Number,
      default: 60,
    },
  },

  data: () => ({
    ctx: undefined,
  }),

  methods: {
    // Adjust canvas coordinate size
    resize() {
      this.$refs.stars.width = this.$refs.stars.offsetWidth;
      this.$refs.stars.height = this.$refs.stars.offsetHeight;
    },
  },

  mounted() {
    this.ctx = this.$refs.stars.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  },
};
