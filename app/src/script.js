import { mapState, mapGetters, mapActions } from 'vuex';

import router, { routers } from './router';
import store from './vuex';

export default {
  router,
  store,

  data: () => ({
    fetchPromise: undefined,
  }),

  computed: {
    ...mapGetters({ isAuthenticated: 'auth/isAuthenticated', loginExpired: 'auth/loginExpired', authValid: 'auth/loginValid' }),
    ...mapGetters(['role']),
    ...mapState(['user']),
    ...mapState('classroom/student', { studentClassroom: 'classroom' }),
  },

  watch: {
    isAuthenticated(authed) {
      if (authed) this.$emit('loggedIn');
    },
  },

  methods: {
    ...mapActions({
      fetchSolved: 'fetchSolved',
      fetchPrimaryUserProfile: 'fetchPrimaryUserProfile',
      renew: 'auth/renew',
      logout: 'auth/logout',
    }),

    ...mapActions('classroom/instructor', {
      fetchInstructorClassrooms: 'fetchClassrooms',
    }),

    ...mapActions('classroom/student', {
      fetchStudentClassroom: 'fetchClassroom',
    }),


    async initialFetch() {
      await Promise.all([
        this.fetchPrimaryUserProfile(),
        this.fetchSolved(),
      ]);

      if (this.role === 'instructor') await this.fetchInstructorClassrooms();
      if (this.role === 'student') await this.fetchStudentClassroom();
    },

    switchRoutes(role) {
      // Replace router matcher with a set of routes specific to the user's role
      this.$router.matcher = routers[role].matcher;
      // Hack to force recomputing route (vue-router tries to skip over route transitions between
      // identical routes)
      this.$router.history.current = { matched: [] };
      // Recompute the route we're already on
      this.$router.replace(this.$route.fullPath);
      // Add 404 page
      this.$router.addRoutes(require('./pages/404-route.js').default);
    },
  },

  created() {
    // Promise for fetching some basic user data, which components can await
    this.fetchPromise = new Promise((resolve) => {
      // Stop if:
      // 1. The user isn't trying to be authenticated; no login has occurred
      if (!this.isAuthenticated && !window.location.hash.startsWith('#access_token')) return resolve();
      // 2. User data has already been fetched! We're done!
      if (this.user.solved !== null) return resolve();

      // We're already logged in! Just fetch and go
      if (this.authValid()) this.initialFetch().then(resolve);
      // We need to renew
      else if (this.isAuthenticated && this.loginExpired()) {
        this.renew()
          .then(this.initialFetch)
          .then(resolve);
      // We're not logged in; wait for authentication, then fetch
      } else this.$once('loggedIn', () => this.initialFetch().then(resolve));
      return undefined;
    })
      .then(() => { if (this.role) this.switchRoutes(this.role); });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(name => document.addEventListener(name, e => e.preventDefault()));
  },
};
