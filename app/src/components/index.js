/* eslint-disable import/first */
import Vue from 'vue';

// External components
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
Vue.component('codemirror', codemirror);

// Icons
import './icons';

// Internal components
import Sidebar from './sidebar/sidebar.vue';
Vue.component('sidebar', Sidebar);

import RadialProgress from './radial-progress/radial-progress.vue';
Vue.component('radial-progress', RadialProgress);

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
