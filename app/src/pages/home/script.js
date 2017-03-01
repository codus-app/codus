import Starfield from '../../scripts/starfield';

export default {
  name: 'home',

  data: () => ({
    loginShown: false,
  }),

  mounted() {
    this.stars = new Starfield(document.getElementById('stars'));
  },

  created() {
    window.bus1.$on('showModal', this.openLogin);
  },

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
