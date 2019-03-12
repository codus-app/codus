/* global CODUS_LANDING_URL */
import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './vuex';
import { webAuth } from './vuex/auth';
import routes from './pages';

Vue.use(VueRouter);

const mainRouter = new VueRouter({
  mode: 'history',
  routes: routes.student,
});


// Set page title based on page metadata and check login on each navigation
mainRouter.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || 'Codus';

  // Parse login information if necessary
  if (window.location.hash) {
    await new Promise((resolve) => {
      webAuth.parseHash({
        hash: window.location.hash,
        state: localStorage.state, // localstorage-iframe receives and stores these values
        nonce: localStorage.nonce,
      }, (err, res) => {
        if (res) store.dispatch('auth/loginCallback', res); // hash was found and parseable
        resolve();
      });
    });
  }

  // Reject unauthenticated users from protected routes
  if (to.meta.protected && !mainRouter.app.$store.getters['auth/isAuthenticated']) {
    window.location.replace(`${CODUS_LANDING_URL}/login?backto=${encodeURIComponent(to.fullPath)}`);
  }

  next();
});

export default mainRouter;


export const routers = {
  student: new VueRouter({
    mode: 'history',
    routes: routes.student,
  }),

  instructor: new VueRouter({
    mode: 'history',
    routes: routes.instructor,
  }),
};
