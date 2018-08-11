export default [
  // User

  {
    path: '/',
    name: 'home',
    component: require('./home/home.vue').default,
    meta: { icon: 'home', label: 'Home', category: 'user' },
  },
  {
    path: '/statistics',
    name: 'statitstics',
    component: require('./statistics/statistics.vue').default,
    meta: { icon: 'bar-chart-2', label: 'Statistics', category: 'user' },
  },
  {
    path: '/recently-completed',
    name: 'recent',
    component: require('./recently-completed/recently-completed.vue').default,
    meta: { icon: 'clock', label: 'Recently completed', category: 'user' },
  },

  // Class

  {
    path: '/assignments',
    name: 'assignments',
    component: require('./assignments/assignments.vue').default,
    meta: { icon: 'inbox', label: 'Assignments', category: 'class' },
  },
  {
    path: '/class',
    name: 'class',
    component: require('./class/class.vue').default,
    meta: { icon: 'users', label: 'Members', category: 'class' },
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: require('./leaderboard/leaderboard.vue').default,
    meta: { icon: 'award', label: 'Leaderboard', category: 'class' },
  },

  // Problem editor
  // Won't render in sidebar because it has no category set in meta

  {
    path: '/problem/:category/:name',
    name: 'problem',
    component: require('./editor/editor.vue').default,
    meta: { collapseSidebar: true },
  },
];
