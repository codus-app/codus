export default {
  name: 'home',

  data: () => ({
    showTitle: true,
  }),

  mounted() {
    if (this.$store.state.loggedIn) this.$router.replace('app');

    this.$refs.loginModal.$on('show', () => { this.showTitle = false; });
    this.$refs.signupModal.$on('show', () => { this.showTitle = false; });
    this.$refs.loginModal.$on('close', () => { this.showTitle = true; });
    this.$refs.signupModal.$on('close', () => { this.showTitle = true; });
  },
};
