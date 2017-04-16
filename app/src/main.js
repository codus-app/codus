import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

// Pages
import LandingPage from './pages/landing/landing.vue';
import LoginPage from './pages/login/login.vue';
import LoginCallbackPage from './pages/login-callback/login-callback.vue';
import AppPage from './pages/app/app.vue';

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
import Profile from './components/profile/profile.vue';

// Misc
import appRoutes from './pages/app/routes';

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


// Vue router setup


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: LandingPage,
      meta: { title: 'Codus' },
    },
    {
      name: 'login',
      path: '/login',
      component: LoginPage,
      meta: { title: 'Log In' },
    },
    {
      name: 'login-callback',
      path: '/login_callback',
      component: LoginCallbackPage,
      meta: { title: 'Logging in...' },
    },
    {
      name: 'app',
      path: '/app/:id',
      component: AppPage,
      meta: { title: 'Codus' },
      children: appRoutes,
      // beforeEnter hook used to redirect to home if not logged in.
      beforeEnter(to, from, next) {
        if (!auth.isAuthenticated()) next({ path: '/login' });
        else next();
      },
    },
  ],
});

// Set page title based on page metadata on each navigation
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Codus';
  next();
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
Vue.component('profile', Profile);

// Create main Vue instance


window.app = new Vue({
  router,
  store,

  ready() {},

  methods: {},
}).$mount('#app');
