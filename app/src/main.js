import Vue from 'vue';
import VueRouter from 'vue-router';

// Pages
import HomePage from './pages/home/home.vue';
import LoginPage from './pages/login/login.vue';

// Components
import Modal from './components/modal/modal.vue';
import Login from './components/login/login.vue';
import TopBar from './components/top-bar/top-bar.vue';

import auth from './scripts/auth';

window.auth = auth;

// Global event bus
window.bus1 = new Vue();

// Vue router setup

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      components: {
        default: HomePage,
        navlinks: require('./pages/home/top-bar.vue'),
      },
      meta: { title: 'Codus' },
    },
    {
      name: 'login',
      path: '/login',
      components: { default: LoginPage },
      meta: { title: 'Logging in...' },
    },
  ],
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Codus';
  next();
});

// Register components
Vue.component('modal', Modal);
Vue.component('login', Login);
Vue.component('top-bar', TopBar);

// Create main Vue instance

window.app = new Vue({
  router,
  data: () => ({}),

  ready() {},

  methods: {},
}).$mount('#app');
