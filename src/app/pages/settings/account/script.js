import { mapState } from 'vuex';

export default {
  data: () => ({
    username: '',
    name: '',
  }),

  computed: {
    ...mapState({ profile: state => state.user.profile }),

    profileChanged() {
      const remote = this.profile;
      return Object.keys(this.profile).length // Profile loaded
        && (this.username !== remote.username || this.name !== remote.name); // Info changed
    },
  },

  watch: {
    profile() {
      this.username = this.profile.username;
      this.name = this.profile.name;
    },
  },
};
