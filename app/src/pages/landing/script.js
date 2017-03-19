export default {
  name: 'home',

  data: () => ({
    loginShown: false,
  }),

  mounted() {
    if (this.$store.state.loggedIn) this.$router.replace('app');
  },
};
