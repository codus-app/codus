/* global CODUS_APP_URL */

import { mapGetters, mapActions } from 'vuex';
import { clamp } from '../../helpers';

export default {
  props: { passedProfile: Object, contextItems: Array },

  data: () => ({
    notFound: false,
    exactSolutions: false,
  }),

  computed: {
    ...mapGetters({ getUser: 'getUser', authenticatedUserProfile: 'profile' }),

    username() { return this.$route.params.username; },

    profile() { return this.passedProfile || this.getUser(this.username); },
    profileLoaded() { return Object.keys(this.profile).length; },

    proportionSolved() {
      const progressFraction = this.profile.solutionProgress;
      if (!progressFraction) return undefined;
      return clamp(progressFraction[0] / progressFraction[1], 0, 1);
    },

    isAuthenticatedUser() { return this.authenticatedUserProfile.username === this.username; },

    profileContextItems() {
      if (this.$props.contextItems) return this.$props.contextItems;

      const editProfile = { icon: 'edit', label: 'Edit profile', onclick: () => this.$router.push('/settings/account') };
      const copyLink = { icon: 'copy', label: 'Copy link', onclick: this.copyLink };
      return this.isAuthenticatedUser
        ? [editProfile, copyLink]
        : [copyLink];
    },
  },

  methods: {
    ...mapActions(['fetchUser']),

    fetch() {
      const { username } = this;
      if (username && !this.profileLoaded) {
        this.fetchUser({ username })
          .catch((e) => { if (e.endsWith('not found')) this.notFound = true; });
      }
    },

    copyLink() {
      navigator.permissions.query({ name: 'clipboard-write' })
        .then(({ state }) => {
          if (state === 'granted') {
            navigator.clipboard.writeText(`${CODUS_APP_URL}/user/${this.username}`);
          }
        });
    },
  },

  watch: {
    username() { this.fetch(); },
    profileLoaded() { this.$emit('loadStateChange', this.profileLoaded); },
  },

  created() { this.fetch(); },

  components: {
    'user-profile-summary': require('./components/user-profile-summary/user-profile-summary.vue').default,
    'not-found': require('../404/404.vue').default,
  },
};
