import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getUser']),

    username() { return this.$route.params.username; },
    profile() { return this.getUser(this.username); },
  },

  methods: {
    ...mapActions(['fetchUser']),

    fetch() {
      if (this.username && !Object.keys(this.profile).length) this.fetchUser({ username: this.username });
    },
  },

  watch: {
    username() { this.fetch(); },
  },

  created() { this.fetch(); },
};
