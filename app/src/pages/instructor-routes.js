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
    name: 'classroom-overview',
    component: require('./classroom/instructor/overview/overview.vue').default,
    meta: { icon: 'book-open', label: 'Overview', category: `${namespace}/classroom`, protected: true },
  },
  {
    path: '/classroom/:classroomCode/students',
    name: 'classroom-students',
    meta: { icon: 'users', label: 'Students', category: `${namespace}/classroom`, protected: true },
  },
  {
    path: '/classroom/:classroomCode/assignments',
    name: 'classroom-assignments',
    meta: { icon: 'inbox', label: 'Assignments', category: `${namespace}/classroom`, protected: true },
  },
];
