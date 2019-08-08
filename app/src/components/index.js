/* eslint-disable import/first */
import Vue from 'vue';

// External components

import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
Vue.component('codemirror', codemirror);

import simplebar from 'simplebar-vue';
Vue.component('simplebar', simplebar);

import draggable from 'vuedraggable';
Vue.component('draggable', draggable);

// Icons

import './icons';

// Internal components

import Sidebar from './sidebar/sidebar.vue';
Vue.component('sidebar', Sidebar);

import Editor from './editor/editor.vue';
Vue.component('editor', Editor);

import RadialProgress from './radial-progress/radial-progress.vue';
Vue.component('radial-progress', RadialProgress);

import Spinner from './spinner/spinner.vue';
Vue.component('spinner', Spinner);

import BoldButton from './bold-button/bold-button.vue';
Vue.component('bold-button', BoldButton);

import LoadingButton from './loading-button/loading-button.vue';
Vue.component('loading-button', LoadingButton);

import Modal from './modal/modal.vue';
Vue.component('modal', Modal);

import Breadcrumbs from './breadcrumbs/breadcrumbs.vue';
Vue.component('breadcrumbs', Breadcrumbs);

import Window from './window/window.vue';
Vue.component('window', Window);

import TextInput from './input/input.vue';
Vue.component('text-input', TextInput);

import ActionInput from './action-input/action-input.vue';
Vue.component('action-input', ActionInput);

import ContextMenu from './context-menu/context-menu.vue';
Vue.component('context-menu', ContextMenu);

import DashboardCard from './dashboard-card/dashboard-card.vue';
Vue.component('dashboard-card', DashboardCard);

import ProfileChip from './profile-chip/profile-chip.vue';
Vue.component('profile-chip', ProfileChip);

// Classroom components

import ClassroomHeader from './classroom/header/header.vue';
Vue.component('classroom-header', ClassroomHeader);

import ClassroomInvitation from './classroom/invitation/invitation.vue';
Vue.component('classroom-invitation-modal', ClassroomInvitation);

import ClassroomAssignmentCreate from './classroom/assignment-create/assignment-create.vue';
Vue.component('assignment-creation-modal', ClassroomAssignmentCreate);

import ClassroomSettings from './classroom/settings/settings.vue';
Vue.component('classroom-settings-modal', ClassroomSettings);

import ClassroomJoinModal from './classroom/join-modal/join-modal.vue';
Vue.component('classroom-join-modal', ClassroomJoinModal);

// Transition effects

import './transitions';
