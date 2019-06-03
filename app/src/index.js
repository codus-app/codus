/* global CODUS_LANDING_URL */
/* eslint-disable import/first */

// Polyfills
import 'babel-polyfill';
import ElementQueries from 'css-element-queries/src/ElementQueries';
ElementQueries.listen();
import ResizeObserver from 'resize-observer-polyfill';
if (!window.ResizeObserver) window.ResizeObserver = ResizeObserver;

// Vue
import Vue from 'vue';

// HTML
import './index.html';
import './localstorage-iframe.html';

// Styles
import './style.sass';
import 'simplebar/dist/simplebar.min.css';

// Components
import './components';


// Plugins

import VueTippy from 'vue-tippy';
Vue.use(VueTippy, {
  theme: 'codus-light',
  placement: 'bottom',
  distance: 5,
  animation: 'fade',
  duration: [200, 150],
  delay: 0,
  // Workaround for preventing "fill" animation (animationFill: false is broken)
  arrow: true,
  arrowTransform: 'scale(0)',
});

import PortalVue from 'portal-vue';
Vue.use(PortalVue);

import KeyboardShortcuts from './keyboard-shortcuts';
Vue.use(KeyboardShortcuts);

// Application config

import App from './App.vue';

window.app = new Vue({
  el: '#app',
  render: h => h(App),
});

// API
import * as api from './api'; // eslint-disable-line import/first
window.api = api;

// Auth
const frame = document.createElement('iframe');
frame.src = `${CODUS_LANDING_URL}/localstorage-iframe.html`;
frame.id = 'localstorage';
frame.style.display = 'none';
frame.onload = () => frame.setAttribute('loaded', '');
document.body.appendChild(frame);

// AB
import ab from './ab';
window.ab = ab;
