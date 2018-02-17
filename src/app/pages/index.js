export default [
  // User

  {
    path: '/',
    component: require('./home/home.vue').default,
    meta: { icon: 'home', label: 'Home', category: 'user' },
  },
  {
    path: '/statistics',
    component: require('./statistics/statistics.vue').default,
    meta: { icon: 'bar-chart-2', label: 'Statistics', category: 'user' },
  },
  {
    path: '/recently-completed',
    component: require('./recently-completed/recently-completed.vue').default,
    meta: { icon: 'clock', label: 'Recently completed', category: 'user' },
  },

  // Class

  {
    path: '/assignments',
    component: require('./assignments/assignments.vue').default,
    meta: { icon: 'inbox', label: 'Assignments', category: 'class' },
  },
  {
    path: '/class',
    component: require('./class/class.vue').default,
    meta: { icon: 'user', label: 'Members', category: 'class' },
  },
  {
    path: '/leaderboard',
    component: require('./leaderboard/leaderboard.vue').default,
    meta: { icon: 'award', label: 'Leaderboard', category: 'class' },
  },
];
