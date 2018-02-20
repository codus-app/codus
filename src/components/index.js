/* eslint-disable import/first */
import Vue from 'vue';

// Feather icons
import { UserIcon, LockIcon, AtSignIcon, MailIcon } from 'vue-feather-icons';
Vue.component('user-icon', UserIcon);
Vue.component('lock-icon', LockIcon);
Vue.component('at-sign-icon', AtSignIcon);
Vue.component('mail-icon', MailIcon);

// Internal components
import Starfield from './starfield';
import Modal from './modal/modal.vue';
import Login from './login/login.vue';
import Signup from './signup/signup.vue';
import TopBar from './top-bar/top-bar.vue';
import AuthButtons from './auth-buttons.vue';
Vue.component('starfield', Starfield);
Vue.component('modal', Modal);
Vue.component('login', Login);
Vue.component('signup', Signup);
Vue.component('top-bar', TopBar);
Vue.component('auth-buttons', AuthButtons);
