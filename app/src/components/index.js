import Vue from 'vue';

import Starfield from './starfield';
import Modal from './modal/modal.vue';
import Login from './login/login.vue';
import Signup from './signup/signup.vue';
import TopBar from './top-bar/top-bar.vue';
import AuthButtons from './auth-buttons.vue';
import BinaryBackground from './binary-background';
import { CarouselItem, Carousel, CarouselArrow, CarouselDots } from './carousel/carousel';
import ChallengeCard from './challenge-card/challenge-card.vue';

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
