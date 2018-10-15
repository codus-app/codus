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
  },
  computed: {
    ...mapGetters({ authValid: 'auth/loginValid' }),
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
  },

  methods: {
    ...mapActions({
      fetchSolved: 'fetchSolved',
      logout: 'auth/logout',
    }),

    checkAuth() { if (!this.authValid) this.logout(); },
    // TODO: make this a prop
    updateSidebar() { this.$refs.sidebar.collapsed = this.$route.meta.collapseSidebar || false; },
  },

  mounted() { this.updateSidebar(); },

  created() {
    // Log out if login expires
    window.addEventListener('visibilitychange', this.checkAuth);
    // If we haven't fetched user data
    if (this.user.solved === null) {
      if (this.authValid) this.fetchSolved();
    }
  },
  destroyed() { window.removeEventListener('visibilitychange', this.checkAuth); },

  el: '#app',
});
