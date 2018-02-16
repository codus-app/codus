import Vue from 'vue';

// HTML
import './index.html';

// Styles
import './style.sass';

// Load components
import './components';

import auth from './auth';
window.auth = auth;

window.app = new Vue({
  data: { showTitle: true },
  el: '#app',

  mounted() {
    if (auth.isAuthenticated()) window.location.href = '/app';

    this.$refs.loginModal.$on('show', () => { this.showTitle = false; });
    this.$refs.signupModal.$on('show', () => { this.showTitle = false; });
    this.$refs.loginModal.$on('close', () => { this.showTitle = true; });
    this.$refs.signupModal.$on('close', () => { this.showTitle = true; });
  },

});
