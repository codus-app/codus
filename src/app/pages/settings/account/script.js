import { mapState } from 'vuex';

export default {
  data: () => ({
    username: '',
    name: '',
  }),

  computed: {
    ...mapState({ profile: state => state.user.profile }),
  },

  watch: {
    profile() {
      this.username = this.profile.username;
      this.name = this.profile.name;
    },
  },
};
