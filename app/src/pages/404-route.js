export default [
  {
    path: '*',
    name: '404',
    component: require('./404/404.vue').default,
    meta: { title: 'Page not found | Codus', protected: true },
  },
];
