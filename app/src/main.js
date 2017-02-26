import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './pages/home/home.vue';
import auth from './scripts/auth';

Vue.use(VueRouter);

// Vue router setup

const router = new VueRouter({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: Home, meta: { title: 'Codus' } },
  ],
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Codus';
  next();
});

// Create main Vue instance

window.app = new Vue({
  router,
  data: () => ({
    authenticated: false,
    secretThing: '',
    lock: auth.lock,
  }),

  ready() {
    this.authenticated = auth.checkAuth();
  },

  methods: {
    login: auth.login,
    logout: auth.logout,
    checkAuth: auth.checkAuth,
  },
}).$mount('#app');
