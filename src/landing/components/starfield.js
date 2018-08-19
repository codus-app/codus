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
    running: true,
  }),

  mounted() {
    setTimeout(() => {
      // Get canvas context
      this.ctx = this.$refs.stars.getContext('2d');
      // Set up resizing
      this.resize();
      window.addEventListener('resize', () => this.resize());
      // Populate stars
      for (let i = 0; i < this.starCount; i += 1) {
        this.stars.push(this.getStar());
      }
      // Start
      this.start();
    }, 50);
  },

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

    // Draw and move all stars
    step() {
      this.ctx.clearRect(0, 0, this.$refs.stars.width, this.$refs.stars.height);

      for (let i = 0; i < this.stars.length; i += 1) {
        const star = this.stars[i];
        const progress = (1 - (star.z / 25));
        const lightness = Math.round(progress * 255);
        this.ctx.fillStyle = `rgb(${lightness}, ${lightness}, ${lightness})`;

        const projectedX = (100 / star.z) * star.x;
        const projectedY = (100 / star.z) * star.y;
        const finalX = projectedX + (this.$refs.stars.width / 2);
        const finalY = projectedY + (this.$refs.stars.height / 2);

        this.ctx.fillRect(finalX, finalY, 5 * progress, 5 * progress);

        star.z -= this.speed / 100;
        if (star.z < 0 ||
            finalX < 0 ||
            finalY < 0 ||
            finalX > this.$refs.stars.width ||
            finalY > this.$refs.stars.height) {
          this.stars[i] = this.getStar(true);
        }
      }
    },

    // Begin render loop
    start() {
      setTimeout(() => {
        if (this.running) this.step();
        this.start(); // Recur
      }, 1000 / this.fps);
    },
  },
};
