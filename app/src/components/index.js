/* eslint-disable import/first */
import Vue from 'vue';

// External components
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
Vue.component('codemirror', codemirror);


import {
  // Sidebar icons
  HomeIcon,
  UserIcon,
  LogOutIcon,
  // Home icons
  CheckIcon,
  // Editor icons
  ChevronsLeftIcon,
  MenuIcon,
  PlayIcon,
  Trash2Icon,
  SettingsIcon,
  SearchIcon,
  ShareIcon,
  FolderIcon,
  FileIcon,
  FileTextIcon,
  Minimize2Icon,
  Maximize2Icon,
  // Settings pages icons
  CameraIcon,
  UploadCloudIcon,
  // Social icons
  AtSignIcon,
  // Misc
  ChevronUpIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  XIcon,
  XCircleIcon,
} from 'vue-feather-icons';

// Sidebar icons
Vue.component('icon-home', HomeIcon);
Vue.component('icon-user', UserIcon);
Vue.component('icon-log-out', LogOutIcon);
// Home icons
Vue.component('icon-check', CheckIcon);
// Editor icons
Vue.component('icon-chevrons-left', ChevronsLeftIcon);
Vue.component('icon-menu', MenuIcon);
Vue.component('icon-play', PlayIcon);
Vue.component('icon-trash', Trash2Icon);
Vue.component('icon-settings', SettingsIcon);
Vue.component('icon-search', SearchIcon);
Vue.component('icon-share', ShareIcon);
Vue.component('icon-folder', FolderIcon);
Vue.component('icon-file', FileIcon);
Vue.component('icon-file-text', FileTextIcon);
Vue.component('icon-maximize', Maximize2Icon);
Vue.component('icon-minimize', Minimize2Icon);
// Settings pages icons
Vue.component('icon-camera', CameraIcon);
Vue.component('icon-upload-cloud', UploadCloudIcon);
// Social icons
Vue.component('icon-at-sign', AtSignIcon);
// Misc
Vue.component('icon-chevron-up', ChevronUpIcon);
Vue.component('icon-chevron-right', ChevronRightIcon);
Vue.component('icon-chevron-down', ChevronDownIcon);
Vue.component('icon-chevron-left', ChevronLeftIcon);
Vue.component('icon-x', XIcon);
Vue.component('icon-x-circle', XCircleIcon);


// Internal components
import Sidebar from './sidebar/sidebar.vue';
Vue.component('sidebar', Sidebar);

import SidebarUserProfile from './sidebar-user-profile/sidebar-user-profile.vue';
Vue.component('sidebar-user-profile', SidebarUserProfile);

import ProblemLink from './category-card/problem-link';
Vue.component('problem-link', ProblemLink);

import CategoryCard from './category-card/category-card.vue';
Vue.component('category-card', CategoryCard);

import ProgressPie from './progress-pie/progress-pie.vue';
Vue.component('progress-pie', ProgressPie);

import ProgressRing from './progress-ring/progress-ring.vue';
Vue.component('progress-ring', ProgressRing);

import Spinner from './spinner/spinner.vue';
Vue.component('spinner', Spinner);

import BoldButton from './bold-button/bold-button.vue';
Vue.component('bold-button', BoldButton);

import Modal from './modal/modal.vue';
Vue.component('modal', Modal);

import Breadcrumbs from './breadcrumbs/breadcrumbs.vue';
Vue.component('breadcrumbs', Breadcrumbs);

import Window from './window/window.vue';
Vue.component('window', Window);

import TextInput from './input/input.vue';
Vue.component('text-input', TextInput);

import UserProfileSummary from './user-profile-summary/user-profile-summary.vue';
Vue.component('user-profile-summary', UserProfileSummary);
