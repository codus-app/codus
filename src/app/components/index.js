import Vue from 'vue';

import Sidebar from './sidebar/sidebar.vue';
import BinaryBackground from './binary-background';
import { CarouselItem, Carousel, CarouselArrow, CarouselDots } from './carousel/carousel';
import ChallengeCard from './challenge-card/challenge-card.vue';


Vue.component('binary-background', BinaryBackground);
Vue.component('carousel-item', CarouselItem);
Vue.component('carousel', Carousel);
Vue.component('carousel-arrow', CarouselArrow);
Vue.component('carousel-dots', CarouselDots);
Vue.component('challenge-card', ChallengeCard);
Vue.component('sidebar', Sidebar);
