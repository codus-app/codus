import Vue from 'vue';
import VueRouter from 'vue-router';

import auth from '../auth';
import routes from './pages';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/app/',
  routes,
});

// Set page title based on page metadata on each navigation
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Codus';

  // Parse login information if necessary
  auth.webAuth.parseHash(window.location.hash, async (err, res) => {
    if (res) { // hash was found and parseable
      await auth.loginCallback(res);
      next();
      router.app.$emit('loggedIn'); // So that components can refresh
    // hash was either not present or improperly formatted
    } else next();
  });
});

export default router;
