import Vue from 'vue';

import './components';
import router from './router';
import store from './store'; // VueX

import auth from './scripts/auth';
window.auth = auth;


window.app = new Vue({
  router,
  store,

  ready() {},

  methods: {},
}).$mount('#app');
