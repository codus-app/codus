export const namespace = 'instructor';

export default [
  {
    path: '/',
    name: 'practice',
    component: require('./home/home.vue').default,
    meta: { icon: 'check-circle', label: 'Practice', category: `${namespace}/personal`, protected: true },
  },
];
