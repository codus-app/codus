import Vue from 'vue';

import { HomeIcon, BarChart2Icon, ClockIcon, InboxIcon, UserIcon, AwardIcon } from 'vue-feather-icons';

import Sidebar from './sidebar/sidebar.vue';

Vue.component('home-icon', HomeIcon);
Vue.component('bar-chart-2-icon', BarChart2Icon);
Vue.component('clock-icon', ClockIcon);
Vue.component('inbox-icon', InboxIcon);
Vue.component('user-icon', UserIcon);
Vue.component('award-icon', AwardIcon);

Vue.component('sidebar', Sidebar);
