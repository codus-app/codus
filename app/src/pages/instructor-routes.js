export const namespace = 'instructor';

export default [
  {
    path: '/',
    name: 'practice',
    component: require('./home/home.vue').default,
    meta: { icon: 'check-circle', label: 'Practice', category: `${namespace}/personal`, protected: true },
  },

  {
    path: '/classroom/:classroomCode/overview',
    name: 'classroom-overview',
    meta: { icon: 'book-open', label: 'Practice', category: `${namespace}/classroom`, protected: true },
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
