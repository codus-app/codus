export default [
  {
    path: '/app',
    component: require('./home/home.vue').default,
    meta: { icon: 'home', label: 'Home', exact: true },
  },
  {
    path: '/app/practice',
    component: require('./practice/practice.vue').default,
    meta: { icon: 'code', label: 'Practice' },
  },
];
