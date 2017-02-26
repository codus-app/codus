const Vue = require('vue');
const VueRouter = require('vue-router');

Vue.use(VueRouter);

const Home = require('./pages/home/home.vue');

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
  ],
});

window.app = new Vue({
  router,
}).$mount('#app');
