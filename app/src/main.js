import Vue from 'vue';
import VueRouter from 'vue-router';

// Pages
import Home from './pages/home/home.vue';
// Components
import Modal from './components/modal/modal.vue';
import Login from './components/login/login.vue';
import TopBar from './components/top-bar/top-bar.vue';

require('./scripts/auth');

// Vue router setup

Vue.use(VueRouter);

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
