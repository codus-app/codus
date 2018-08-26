// Polyfills
import 'babel-polyfill';
import 'promise-polyfill';
import 'whatwg-fetch';

// Vue
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

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

import auth from '../auth';
window.auth = auth;


window.app = new Vue({
  router,
  store,

  data: {
    transitionName: 'route-slide-down',
  },
  computed: { ...mapState(['userFetched']) },

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
    ...mapActions(['fetchUser']),

    checkAuth() { if (auth.loginExpired()) auth.logout(); },
    // TODO: make this a prop
    updateSidebar() { this.$refs.sidebar.collapsed = this.$route.meta.collapseSidebar || false; },
  },

  mounted() { this.updateSidebar(); },

  created() {
    window.addEventListener('visibilitychange', this.checkAuth);
    if (!this.userFetched) this.fetchUser();
  },
  destroyed() { window.removeEventListener('visibilitychange', this.checkAuth); },

  el: '#app',
});
