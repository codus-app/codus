export default [
  {
    path: '/app',
    component: require('./home/home.vue'),
    meta: { icon: 'home', name: 'Home', exact: true },
  },
  {
    path: '/app/practice',
    component: require('./practice/practice.vue'),
    meta: { icon: 'code', name: 'Practice' },
  },
];
