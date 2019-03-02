import { mapGetters, mapActions } from 'vuex';
import { clamp } from '../../helpers';

export default {
  computed: {
    ...mapGetters(['getUser']),

    username() { return this.$route.params.username; },

    profile() { return this.getUser(this.username); },
    profileLoaded() { return Object.keys(this.profile).length; },

    proportionSolved() {
      const progressFraction = this.profile.solutionProgress;
      if (!progressFraction) return undefined;
      return clamp(progressFraction[0] / progressFraction[1], 0, 1);
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
