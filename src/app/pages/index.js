export default [
  {
    path: '/',
    component: require('./home/home.vue').default,
    meta: { icon: 'home', label: 'Home', exact: true },
  },
  {
    path: '/practice',
    component: require('./practice/practice.vue').default,
    meta: { icon: 'code', label: 'Practice' },
  },
];
