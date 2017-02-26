const Starfield = require('../../scripts/starfield.js');

module.exports = {
  name: 'home',

  data() {
    return { a: 'b' };
  },

  mounted() {
    this.stars = new Starfield(document.getElementById('stars'));
  },
};
