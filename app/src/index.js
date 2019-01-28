/* global CODUS_LANDING_URL */

// Polyfills
import 'babel-polyfill';
import 'promise-polyfill';
import 'abortcontroller-polyfill';
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


import router from './router';
import store from './vuex';

window.app = new Vue({
  router,
  store,

  data: {
    fetchPromise: undefined,
  },
  computed: {
    ...mapGetters({ isAuthenticated: 'auth/isAuthenticated', authValid: 'auth/loginValid' }),
    ...mapState(['user']),
  },

  watch: {
    isAuthenticated(authed) {
      if (authed) this.$emit('loggedIn');
    },
  },

  methods: {
    ...mapActions({
      fetchSolved: 'fetchSolved',
      fetchUserProfile: 'fetchUserProfile',
      logout: 'auth/logout',
    }),
  },

  created() {
    // Promise for fetching some basic user data, which components can await
    this.fetchPromise = (async () => {
      // If we haven't fetched user data
      if (this.user.solved === null) {
        // We're already logged in
        if (this.authValid()) await Promise.all([this.fetchUserProfile(), this.fetchSolved()]);
        // We're not logged in; wait for authentication (and *then* the request) to complete before
        // resolving
        // "Once logged in, fetchUserProfile, fetchSolved then resolve" hooray for semantic code
        else await new Promise(resolve => this.$once('loggedIn', () => Promise.all([this.fetchUserProfile(), this.fetchSolved()]).then(resolve)));
      }
    })();
  },

  el: '#app',
});

// API
import * as api from './api'; // eslint-disable-line import/first
window.api = api;

// Auth
const frame = document.createElement('iframe');
frame.src = `${CODUS_LANDING_URL}/localstorage-iframe.html`;
frame.id = 'localstorage';
frame.style.display = 'none';
frame.onload = () => frame.setAttribute('loaded', '');
document.body.appendChild(frame);
