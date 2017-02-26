const Vue = require('vue');
const VueRouter = require('vue-router');

Vue.use(VueRouter);

// Vue router setup

const Home = require('./pages/home/home.vue');

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

window.app = new Vue({ router }).$mount('#app');
