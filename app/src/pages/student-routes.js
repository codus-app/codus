export const namespace = 'student';

export default [
  // Student homepage: dashboard

  {
    path: '/',
    name: 'home',
    component: require('./home/home.vue').default,
    meta: { icon: 'home', label: 'Home', category: `${namespace}/personal`, protected: true },
  },

  {
    path: '/classroom',
    component: require('./classroom/student/base.vue').default,
    children: [
      {
        path: '/',
        name: 'classroom-overview',
        meta: { icon: 'book-open', label: 'Overview', category: `${namespace}/classroom`, protected: true },
      },
      {
        path: 'students/:username?',
        name: 'classroom-students',
        meta: { icon: 'users', label: 'Students', category: `${namespace}/classroom`, looseMatch: true, protected: true },
      },
      {
        path: 'assignments',
        name: 'classroom-assignments',
        meta: { icon: 'inbox', label: 'Assignments', category: `${namespace}/classroom`, protected: true },
      },
    ],
  },
];
