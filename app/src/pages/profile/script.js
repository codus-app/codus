import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getUser']),

    username() { return this.$route.params.username; },
    profile() { return this.getUser(this.username); },
    percentSolved() {
      const proportionSolved = this.profile.solutionProgress[0] / this.profile.solutionProgress[1];
      return Math.floor(proportionSolved * 100);
    },
  },

  methods: {
    ...mapActions(['fetchUser']),

    fetch() {
      const { username } = this;
      if (username && !Object.keys(this.profile).length) this.fetchUser({ username });
    },
  },

  watch: {
    username() { this.fetch(); },
  },

  created() { this.fetch(); },
};
