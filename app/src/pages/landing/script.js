import Starfield from '../../scripts/starfield';

export default {
  name: 'home',

  data: () => ({
    loginShown: false,
  }),

  mounted() {
    if (this.$store.state.loggedIn) this.$router.replace('app');
    this.stars = new Starfield(document.getElementById('stars'));
  },
};
