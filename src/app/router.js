import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './vuex';
import { webAuth } from './vuex/auth';
import routes from './pages';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/app/',
  routes,
});

// Set page title based on page metadata and check login on each navigation
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Codus';

  // Parse login information if necessary
  webAuth.parseHash(window.location.hash, async (err, res) => {
    if (res) { // hash was found and parseable
      await store.dispatch('auth/loginCallback', res);
      next();
    // hash was either not present or improperly formatted, log out
    } else if (store.getters['auth/loginExpired']()) store.auth.dispatch('auth/logout');
    else next();
  });
});

export default router;
