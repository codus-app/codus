import Vue from 'vue';
import VueRouter from 'vue-router';

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
  next();
});

export default router;
