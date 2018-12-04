export default [
  // User

  {
    path: '/',
    name: 'home',
    component: require('./home/home.vue').default,
    meta: { icon: 'home', label: 'Home', category: 'user' },
  },
  // {
  //   path: '/statistics',
  //   name: 'statitstics',
  //   component: require('./statistics/statistics.vue').default,
  //   meta: { icon: 'bar-chart', label: 'Statistics', category: 'user' },
  // },
  // {
  //   path: '/recently-completed',
  //   name: 'recent',
  //   component: require('./recently-completed/recently-completed.vue').default,
  //   meta: { icon: 'clock', label: 'Recently completed', category: 'user' },
  // },

  // Class

  // {
  //   path: '/assignments',
  //   name: 'assignments',
  //   component: require('./assignments/assignments.vue').default,
  //   meta: { icon: 'inbox', label: 'Assignments', category: 'class' },
  // },
  // {
  //   path: '/students',
  //   name: 'students',
  //   component: require('./students/students.vue').default,
  //   meta: { icon: 'users', label: 'Students', category: 'class' },
  // },
  // {
  //   path: '/leaderboard',
  //   name: 'leaderboard',
  //   component: require('./leaderboard/leaderboard.vue').default,
  //   meta: { icon: 'award', label: 'Leaderboard', category: 'class' },
  // },

  // Problem editor
  // Won't render in sidebar because it has no category set in meta

  {
    path: '/problem/:category/:name',
    name: 'problem',
    component: require('./editor/editor.vue').default,
    meta: { collapseSidebar: true },
  },

  // Settings pages

  {
    path: '/settings/account',
    name: 'profile-settings',
    component: require('./settings/account/account-settings.vue').default,
    meta: {},
  },
];
