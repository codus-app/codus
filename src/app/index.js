// Polyfills
import 'babel-polyfill';
import 'promise-polyfill';
import 'whatwg-fetch';

// Vue
import Vue from 'vue';
import { mapState, mapGetters, mapActions } from 'vuex';

// HTML
import './index.html';

// Styles
import './style.sass';

// Components
import './components';

// Application config


import routes from './pages';
import router from './router';
import store from './vuex';

window.app = new Vue({
  router,
  store,

  data: {
    transitionName: 'route-slide-down',
    fetchPromise: undefined,
  },
  computed: {
    ...mapGetters({ isAuthenticated: 'auth/isAuthenticated', authValid: 'auth/loginValid' }),
    ...mapState(['user']),
  },

  watch: {
    $route(to, from) {
      const paths = routes.map(x => x.path);
      if (paths.indexOf(to.path) < paths.indexOf(from.path)) {
        this.transitionName = 'route-slide-down';
      } else {
        this.transitionName = 'route-slide-up';
      }
      this.updateSidebar();
    },

    isAuthenticated(authed) {
      if (authed) this.$emit('loggedIn');
    },
  },

  methods: {
    ...mapActions({
      fetchSolved: 'fetchSolved',
      logout: 'auth/logout',
    }),

    // TODO: make this a prop
    updateSidebar() { this.$refs.sidebar.collapsed = this.$route.meta.collapseSidebar || false; },
  },

  mounted() { this.updateSidebar(); },

  created() {
    // Promise for fetching some basic user data, which components can await
    this.fetchPromise = (async () => {
      // If we haven't fetched user data
      if (this.user.solved === null) {
        // We're already logged in
        if (this.authValid()) await this.fetchSolved();
        // We're not logged in; wait for authentication (and *then* the request) to complete before
        // resolving
        // "Once logged in, fetchSolved then resolve" hooray for semantic code
        else await new Promise(resolve => this.$once('loggedIn', () => this.fetchSolved().then(resolve)));
      }
    })();
  },

  el: '#app',
});

// API
import * as api from './api'; // eslint-disable-line import/first
window.api = api;
