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
  // Home icons
  CheckIcon,
  // Editor icons
  ChevronsLeftIcon,
  MenuIcon,
  PlayIcon,
  Trash2Icon,
  SettingsIcon,
  ShareIcon,
  FolderIcon,
  FileIcon,
  FileTextIcon,
  Minimize2Icon,
  Maximize2Icon,
  // Misc
  ChevronUpIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  XIcon,
} from 'vue-feather-icons';

// Sidebar icons
Vue.component('icon-home', HomeIcon);
Vue.component('icon-bar-chart', BarChart2Icon);
Vue.component('icon-clock', ClockIcon);
Vue.component('icon-inbox', InboxIcon);
Vue.component('icon-users', UsersIcon);
Vue.component('icon-award', AwardIcon);
Vue.component('icon-log-out', LogOutIcon);
// Home icons
Vue.component('icon-check', CheckIcon);
// Editor icons
Vue.component('icon-chevrons-left', ChevronsLeftIcon);
Vue.component('icon-menu', MenuIcon);
Vue.component('icon-play', PlayIcon);
Vue.component('icon-trash', Trash2Icon);
Vue.component('icon-settings', SettingsIcon);
Vue.component('icon-share', ShareIcon);
Vue.component('icon-folder', FolderIcon);
Vue.component('icon-file', FileIcon);
Vue.component('icon-file-text', FileTextIcon);
Vue.component('icon-maximize', Maximize2Icon);
Vue.component('icon-minimize', Minimize2Icon);
// Misc
Vue.component('icon-chevron-up', ChevronUpIcon);
Vue.component('icon-chevron-right', ChevronRightIcon);
Vue.component('icon-chevron-down', ChevronDownIcon);
Vue.component('icon-chevron-left', ChevronLeftIcon);
Vue.component('icon-x', XIcon);


// Internal components
import Sidebar from './sidebar/sidebar.vue';
Vue.component('sidebar', Sidebar);

import ProblemLink from './category-card/problem-link';
Vue.component('problem-link', ProblemLink);

import CategoryCard from './category-card/category-card.vue';
Vue.component('category-card', CategoryCard);

import ProgressPie from './progress-pie/progress-pie.vue';
Vue.component('progress-pie', ProgressPie);

import ConfirmModal from './confirm-modal/confirm-modal.vue';
Vue.component('confirm-modal', ConfirmModal);

import Spinner from './spinner/spinner.vue';
Vue.component('spinner', Spinner);

import Breadcrumbs from './breadcrumbs/breadcrumbs.vue';
Vue.component('breadcrumbs', Breadcrumbs);

import Window from './window/window.vue';
Vue.component('window', Window);

import UserProfileSummary from './user-profile-summary/user-profile-summary.vue';
Vue.component('user-profile-summary', UserProfileSummary);

import TextInput from './input/input.vue';
Vue.component('text-input', TextInput);
