import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getUser']),

    username() { return this.$route.params.username; },

    profile() { return this.getUser(this.username); },
    profileLoaded() { return Object.keys(this.profile).length; },

    percentSolved() {
      const progressFraction = this.profile.solutionProgress;
      if (!progressFraction) return undefined;
      const proportionSolved = progressFraction[0] / progressFraction[1];
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
