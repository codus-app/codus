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
};
