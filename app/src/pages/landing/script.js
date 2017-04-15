export default {
  name: 'home',

  mounted() {
    if (this.$store.state.loggedIn) this.$router.replace('app');
  },
};
