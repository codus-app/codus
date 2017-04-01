export default [
  {
    path: '/app',
    component: require('./home/home.vue'),
    meta: { icon: 'home', label: 'Home', exact: true },
  },
  {
    path: '/app/practice',
    component: require('./practice/practice.vue'),
    meta: { icon: 'code', label: 'Practice' },
  },
];
