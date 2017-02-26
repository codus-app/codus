import Starfield from '../../scripts/starfield';

export default {
  name: 'home',

  mounted() {
    this.stars = new Starfield(document.getElementById('stars'));
  },
};
