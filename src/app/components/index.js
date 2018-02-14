import Vue from 'vue';

import Sidebar from './sidebar/sidebar.vue';
import BinaryBackground from './binary-background';
import ChallengeCard from './challenge-card/challenge-card.vue';


Vue.component('binary-background', BinaryBackground);
Vue.component('challenge-card', ChallengeCard);
Vue.component('sidebar', Sidebar);
