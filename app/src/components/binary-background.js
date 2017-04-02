export default {
  template: '<canvas ref="binarybg"></canvas>',

  props: {
    textColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.2)',
    },
    fontSize: {
      type: Number,
      default: 15,
    },
  },

  data: () => ({
    ctx: undefined,
    rows: [],
  }),

  mounted() {
    // Get canvas context
    this.ctx = this.$refs.binarybg.getContext('2d');
    // Set up resizing
    setTimeout(() => this.resize(), 50);
    window.addEventListener('resize', () => this.resize());
  },

  methods: {
    // Get a random digit (0 or 1)
    randomDigit() { return [0, 1][Math.round(Math.random())]; },
    // Return the size of the canvas
    canvasSize() { return [this.$refs.binarybg.width, this.$refs.binarybg.height]; },
    resize() {
      // Update canvas coordinate systenm to match actual canvas size
      this.$refs.binarybg.width = this.$refs.binarybg.offsetWidth;
      this.$refs.binarybg.height = this.$refs.binarybg.offsetHeight;
      // If we're on a retina screen, double the size. This is because the font will be drawn at
      // twice the size and then scaled down, which results in smooth font rendering.
      if (window.devicePixelRatio === 2) {
        this.$refs.binarybg.width = this.$refs.binarybg.width * 2;
        this.$refs.binarybg.height = this.$refs.binarybg.height * 2;
      }
      // Redraw immediately after resize to prevent flickers while resizing
      this.draw();
    },

    draw() {
      const thinSpace = String.fromCharCode(8201);
      const fontSize = this.fontSize * (window.devicePixelRatio === 2 ? 2 : 1);
      this.ctx.font = `${fontSize}px Inconsolata`;
      this.ctx.fillStyle = this.textColor;
      const numRows = Math.ceil(this.canvasSize()[1] / fontSize) + 1;
      const numCols = Math.ceil(this.canvasSize()[0] / this.ctx.measureText(`0${thinSpace}`).width);

      // Populate rows
      while (this.rows.length < numRows) {
        let row = '';
        for (let c = 0; c < numCols; c += 1) {
          row += this.randomDigit();
        }
        this.rows.push(row);
      }
      // Decimate rows
      if (this.rows.length > numRows) {
        this.rows = this.rows.slice(0, numRows);
      }


      for (let r = 0; r < this.rows.length; r += 1) {
        // Populate columns
        if (this.rows[r].length < numCols) {
          for (let i = 0; i < numCols - this.rows[r].length; i += 1) {
            this.rows[r] += this.randomDigit();
          }
        }
        // Decimate columns
        if (this.rows[r].length > numCols) {
          this.rows[r] = this.rows[r].substring(0, numCols);
        }
      }

      // Render
      this.ctx.clearRect(0, 0, ...this.canvasSize());
      for (let r = 0; r < numRows; r += 1) {
        this.ctx.fillText(this.rows[r].split('').join(thinSpace), fontSize / 3, r * fontSize);
      }
    },
  },
};
