import Vue from 'vue';

import { HomeIcon, BarChart2Icon, ClockIcon, InboxIcon, UsersIcon, AwardIcon, LogOutIcon } from 'vue-feather-icons';

import Sidebar from './sidebar/sidebar.vue';
import ProblemLink from './category-card/problem-link';
import CategoryCard from './category-card/category-card.vue';

Vue.component('home-icon', HomeIcon);
Vue.component('bar-chart-2-icon', BarChart2Icon);
Vue.component('clock-icon', ClockIcon);
Vue.component('inbox-icon', InboxIcon);
Vue.component('users-icon', UsersIcon);
Vue.component('award-icon', AwardIcon);
Vue.component('log-out-icon', LogOutIcon);

Vue.component('sidebar', Sidebar);
Vue.component('problem-link', ProblemLink);
Vue.component('category-card', CategoryCard);
