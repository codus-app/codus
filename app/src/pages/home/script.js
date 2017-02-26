const Starfield = require('../../scripts/starfield.js');

export default {
  name: 'home',

  data() {
    return { a: 'b' };
  },

  mounted() {
    this.stars = new Starfield(document.getElementById('stars'));
  },
};
