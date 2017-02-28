import Starfield from '../../scripts/starfield';

export default {
  name: 'home',

  mounted() {
    this.stars = new Starfield(document.getElementById('stars'));
  },

  data: () => ({
    loginShown: false,
  }),

  methods: {
    // Open the "log in" modal
    openLogin() { this.loginShown = true; },

    // Close the "log in" modal
    closeLogin() { this.loginShown = false; },

    // Toggle the "log in" modal
    toggleLogin() {
      if (this.loginShown) this.closeLogin();
      else this.openLogin();
    },
  },
};
