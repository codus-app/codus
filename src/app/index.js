// Polyfills
import 'babel-polyfill';
import 'promise-polyfill';
import 'whatwg-fetch';

// Vue
import Vue from 'vue';

// HTML
import './index.html';

// Styles
import './style.sass';

// Components
import './components';


// Application config


import routes from './pages';
import router from './router';

import auth from '../auth';
window.auth = auth;


window.app = new Vue({
  router,

  data: {
    transitionName: 'route-slide-down',
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
    checkAuth() { if (auth.loginExpired()) auth.logout(); },
    updateSidebar() { this.$refs.sidebar.collapsed = this.$route.meta.collapseSidebar || false; },
  },

  mounted() { this.updateSidebar(); },

  created() { window.addEventListener('visibilitychange', this.checkAuth); },
  destroyed() { window.removeEventListener('visibilitychange', this.checkAuth); },

  el: '#app',
});
