import Vue from 'vue';
import Vuex from 'vuex';

// Components
import Starfield from './components/starfield';
import Modal from './components/modal/modal.vue';
import Login from './components/login/login.vue';
import Signup from './components/signup/signup.vue';
import TopBar from './components/top-bar/top-bar.vue';
import AuthButtons from './components/auth-buttons.vue';
import BinaryBackground from './components/binary-background';
import { CarouselItem, Carousel, CarouselArrow, CarouselDots } from './components/carousel/carousel';
import ChallengeCard from './components/challenge-card/challenge-card.vue';


// Router
import router from './router';

// Scripts
import auth from './scripts/auth';

window.auth = auth;


// Vuex setup


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loggedIn: auth.isAuthenticated(),
  },
  mutations: {
    setLoggedIn(state) { state.loggedIn = true; },
    setLoggedOut(state) { state.loggedIn = false; },
  },
});


// Register components


Vue.component('starfield', Starfield);
Vue.component('modal', Modal);
Vue.component('login', Login);
Vue.component('signup', Signup);
Vue.component('top-bar', TopBar);
Vue.component('auth-buttons', AuthButtons);
Vue.component('binary-background', BinaryBackground);
Vue.component('carousel-item', CarouselItem);
Vue.component('carousel', Carousel);
Vue.component('carousel-arrow', CarouselArrow);
Vue.component('carousel-dots', CarouselDots);
Vue.component('challenge-card', ChallengeCard);

// Create main Vue instance


window.app = new Vue({
  router,
  store,

  ready() {},

  methods: {},
}).$mount('#app');
