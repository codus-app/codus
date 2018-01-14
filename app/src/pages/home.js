import landing from './landing/landing.vue';
import home from './app/home/home.vue';

// Conditionally render landing page or app homepage based on whether the user is logged in
export default {
  render(createElement) {
    return this.$store.state.loggedIn
      ? createElement(home)
      : createElement(landing);
  },
};
