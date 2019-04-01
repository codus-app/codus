export const namespace = 'instructor';

export default [
  {
    path: '/',
    name: 'practice',
    component: require('./home/home.vue').default,
    meta: { icon: 'check-circle', label: 'Practice', category: `${namespace}/personal`, protected: true },
  },

  {
    path: '/classroom/:classroomCode',
    component: require('./classroom/instructor/base.vue').default,
    children: [
      {
        path: '/',
        name: 'classroom-overview',
        component: require('./classroom/instructor/overview/overview.vue').default,
        meta: { icon: 'book-open', label: 'Overview', category: `${namespace}/classroom`, protected: true },
      },
      {
        path: 'students',
        name: 'classroom-students',
        component: require('./classroom/instructor/students/students.vue').default,
        meta: { icon: 'users', label: 'Students', category: `${namespace}/classroom`, protected: true },
      },
      {
        path: 'assignments',
        name: 'classroom-assignments',
        component: require('./classroom/instructor/assignments/assignments.vue').default,
        meta: { icon: 'inbox', label: 'Assignments', category: `${namespace}/classroom`, protected: true },
      },
    ],
  },
];
