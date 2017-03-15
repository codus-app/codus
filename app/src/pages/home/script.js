import auth from '../../scripts/auth';
import Starfield from '../../scripts/starfield';

export default {
  name: 'home',

  data: () => ({
    loginShown: false,
  }),

  mounted() {
    this.stars = new Starfield(document.getElementById('stars'));
  },

  methods: {
    // Check authentication
    isAuthenticated: auth.isAuthenticated,
  },
};
