/* eslint-disable import/first */
import Vue from 'vue';

// External components
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
Vue.component('codemirror', codemirror);


import {
  // Sidebar icons
  HomeIcon,
  BarChart2Icon,
  ClockIcon,
  InboxIcon,
  UsersIcon,
  AwardIcon,
  LogOutIcon,
  // Editor icons
  PlayIcon,
  Trash2Icon,
  SettingsIcon,
  ShareIcon,
  FolderIcon,
  FileIcon,
  // Misc
  ChevronUpIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from 'vue-feather-icons';

// Sidebar icons
Vue.component('icon-home', HomeIcon);
Vue.component('icon-bar-chart', BarChart2Icon);
Vue.component('icon-clock', ClockIcon);
Vue.component('icon-inbox', InboxIcon);
Vue.component('icon-users', UsersIcon);
Vue.component('icon-award', AwardIcon);
Vue.component('icon-log-out', LogOutIcon);
// Editor icons
Vue.component('icon-play', PlayIcon);
Vue.component('icon-trash', Trash2Icon);
Vue.component('icon-settings', SettingsIcon);
Vue.component('icon-share', ShareIcon);
Vue.component('icon-folder', FolderIcon);
Vue.component('icon-file', FileIcon);
// Misc
Vue.component('icon-chevron-up', ChevronUpIcon);
Vue.component('icon-chevron-right', ChevronRightIcon);
Vue.component('icon-chevron-down', ChevronDownIcon);
Vue.component('icon-chevron-left', ChevronLeftIcon);


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

import ConfirmModal from './confirm-modal/confirm-modal.vue';
Vue.component('confirm-modal', ConfirmModal);

import Spinner from './spinner/spinner.vue';
Vue.component('spinner', Spinner);

import TestResultCard from './test-result-card/test-result-card.vue';
Vue.component('test-result-card', TestResultCard);

import Breadcrumbs from './breadcrumbs/breadcrumbs.vue';
Vue.component('breadcrumbs', Breadcrumbs);
