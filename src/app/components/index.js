/* eslint-disable import/first */
import Vue from 'vue';

// External components
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
Vue.component('codemirror', codemirror);

// Feather icons
import { HomeIcon, BarChart2Icon, ClockIcon, InboxIcon, UsersIcon, AwardIcon, LogOutIcon } from 'vue-feather-icons';
Vue.component('home-icon', HomeIcon);
Vue.component('bar-chart-2-icon', BarChart2Icon);
Vue.component('clock-icon', ClockIcon);
Vue.component('inbox-icon', InboxIcon);
Vue.component('users-icon', UsersIcon);
Vue.component('award-icon', AwardIcon);
Vue.component('log-out-icon', LogOutIcon);

// Internal components
import Sidebar from './sidebar/sidebar.vue';
Vue.component('sidebar', Sidebar);

import ProblemLink from './category-card/problem-link';
Vue.component('problem-link', ProblemLink);

import CategoryCard from './category-card/category-card.vue';
Vue.component('category-card', CategoryCard);

import ProgressPie from './progress-pie/progress-pie.vue';
Vue.component('progress-pie', ProgressPie);

import ProblemsTree from './problems-tree/problems-tree.vue';
Vue.component('problems-tree', ProblemsTree);

import SaveStatus from './save-status/save-status.vue';
Vue.component('save-status', SaveStatus);
