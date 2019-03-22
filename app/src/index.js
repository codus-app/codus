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
import './localstorage-iframe.html';

// Styles
import './style.sass';
import 'simplebar/dist/simplebar.min.css';

// Components
import './components';


// Plugins

import VueTippy from 'vue-tippy';
Vue.use(VueTippy, {
  theme: 'codus-light',
  placement: 'bottom',
  distance: 5,

  animation: 'fade',
  duration: [200, 150],
  delay: 0,
  // Workaround for preventing "fill" animation (animationFill: false is broken)
  arrow: true,
  arrowTransform: 'scale(0)',
});

import KeyboardShortcuts from './keyboard-shortcuts';
Vue.use(KeyboardShortcuts);

// Application config

import router, { routers } from './router';
import store from './vuex';


window.app = new Vue({
  router,
  store,

  data: {
    fetchPromise: undefined,
  },
  computed: {
    ...mapGetters({ isAuthenticated: 'auth/isAuthenticated', authValid: 'auth/loginValid' }),
    ...mapGetters(['role']),
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

    ...mapActions('classroom/instructor', {
      fetchInstructorClassrooms: 'fetchClassrooms',
    }),


    async initialFetch() {
      await Promise.all([
        this.fetchPrimaryUserProfile(),
        this.fetchSolved(),
      ]);

      if (this.role === 'instructor') await this.fetchInstructorClassrooms();
    },

    switchRoutes(role) {
      router.matcher = routers[role].matcher;
      router.replace(this.$route.fullPath);
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
      // We're not logged in; wait for authentication, then fetch
      else this.$once('loggedIn', () => this.initialFetch().then(resolve));
      return undefined;
    })
      .then(() => { if (this.role) this.switchRoutes(this.role); });

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
