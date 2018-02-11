import Vue from 'vue';
import VueRouter from 'vue-router';

import auth from './scripts/auth';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: require('./pages/landing/landing.vue').default,
      meta: { title: 'Codus' },
    },
    {
      name: 'login',
      path: '/login',
      component: require('./pages/login/login.vue').default,
      meta: { title: 'Log In' },
    },
    {
      name: 'login-callback',
      path: '/login_callback',
      component: require('./pages/login-callback/login-callback.vue').default,
      meta: { title: 'Logging in...' },
    },
    {
      name: 'app',
      path: '/app/:id',
      component: require('./pages/app/app.vue').default,
      meta: { title: 'Codus' },
      children: require('./pages/app/routes').default,
      // beforeEnter hook used to redirect to login page if not logged in.
      beforeEnter(to, from, next) {
        if (!auth.isAuthenticated()) { // If not logged in, go to login
          next({ path: '/login' });
        } else if (auth.loginExpired()) { // If the login has expired, log out
          // TODO: renew
          auth.logout();
        } else { // No problems have occurred
          next();
        }
      },
    },
  ],
});

// Set page title based on page metadata on each navigation
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Codus';
  next();
});

export default router;
