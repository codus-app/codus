/* global CODUS_LANDING_URL */
/* eslint-disable import/first */

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


// Plugins

import VueTippy from 'vue-tippy';
Vue.use(VueTippy, {
  theme: 'codus',
  placement: 'bottom',
  distance: 5,

  animation: 'fade',
  duration: [200, 150],
  delay: [400, 0],
  // Workaround for preventing "fill" animation (animationFill: false is broken)
  arrow: true,
  arrowTransform: 'scale(0)',
});

import KeyboardShortcuts from './keyboard-shortcuts';
Vue.use(KeyboardShortcuts);

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
      fetchPrimaryUserProfile: 'fetchPrimaryUserProfile',
      logout: 'auth/logout',
    }),
  },

  created() {
    // Promise for fetching some basic user data, which components can await
    this.fetchPromise = (async () => {
      // If we haven't fetched user data
      if (this.user.solved === null) {
        // We're already logged in
        if (this.authValid()) await Promise.all([this.fetchPrimaryUserProfile(), this.fetchSolved()]);
        // We're not logged in; wait for authentication (and *then* the request) to complete before
        // resolving
        // "Once logged in, fetchPrimaryUserProfile, fetchSolved then resolve" hooray for semantic code
        else await new Promise(resolve => this.$once('loggedIn', () => Promise.all([this.fetchPrimaryUserProfile(), this.fetchSolved()]).then(resolve)));
      }
    })();

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(name => document.addEventListener(name, e => e.preventDefault()));
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
