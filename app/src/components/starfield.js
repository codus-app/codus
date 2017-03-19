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
    stars: [],
  }),

  methods: {
    // Generate a star object
    getStar(back) {
      const rand = (low, high) => (Math.random() * (high - low)) + low;
      const polToCart = (r, theta) => [
        r * Math.cos(theta),
        r * Math.sin(theta),
      ];

      const maxRadius = Math.min(this.$refs.stars.width, this.$refs.stars.height) / 4 / 2;
      const pos = polToCart(
        rand(maxRadius / 25, maxRadius),
        rand(0, Math.PI * 2),
      );

      return {
        x: pos[0],
        y: pos[1],
        z: back ? 25 : rand(0, 25),
      };
    },

    // Adjust canvas coordinate size
    resize() {
      this.$refs.stars.width = this.$refs.stars.offsetWidth;
      this.$refs.stars.height = this.$refs.stars.offsetHeight;
    },
  },

  mounted() {
    // Get canvas context
    this.ctx = this.$refs.stars.getContext('2d');
    // Set up resizing
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Populate stars
    for (let i = 0; i < this.starCount; i += 1) {
      this.stars.push(this.getStar());
    }
  },
};
