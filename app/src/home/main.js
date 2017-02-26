const Vue = require('vue');
const Starfield = require('./starfield');

window.app = new Vue({
  el: '#app',
  data: {
    title: 'codus',
  },
});

window.stars = new Starfield(document.getElementById('stars'));
