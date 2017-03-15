import Starfield from '../../scripts/starfield';

export default {
  name: 'home',

  data: () => ({
    loginShown: false,
  }),

  mounted() {
    this.stars = new Starfield(document.getElementById('stars'));
  },
};
