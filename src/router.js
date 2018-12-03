import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './vuex';
import { webAuth } from './vuex/auth';
import routes from './pages';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

// Set page title based on page metadata and check login on each navigation
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Codus';

  // Parse login information if necessary
  webAuth.parseHash(async (err, res) => {
    if (res) await store.dispatch('auth/loginCallback', res); // hash was found and parseable
    next();
  });
});

export default router;
