export const namespace = 'student';

export default [
  // Student homepage: dashboard

  {
    path: '/',
    name: 'home',
    component: require('./home/home.vue').default,
    meta: { icon: 'home', label: 'Home', category: `${namespace}/personal`, protected: true },
  },
];
