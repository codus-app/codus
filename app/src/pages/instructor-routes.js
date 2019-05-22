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
        path: 'students/:username?',
        name: 'classroom-students',
        component: require('./classroom/instructor/students/students.vue').default,
        meta: { icon: 'users', label: 'Students', category: `${namespace}/classroom`, looseMatch: true, protected: true },
      },
      {
        path: 'assignments',
        name: 'classroom-assignments',
        component: require('./classroom/instructor/assignments/assignments.vue').default,
        meta: { icon: 'inbox', label: 'Assignments', category: `${namespace}/classroom`, looseMatch: true, protected: true },
      },
      {
        path: 'assignments/:assignmentId',
        component: require('./classroom/instructor/assignment/assignment.vue').default,
        meta: {},
        children: [
          {
            path: 'details',
            name: 'classroom-assignment-details',
            component: require('./classroom/instructor/assignment/details/details.vue').default,
            meta: { protected: true },
          },
          {
            path: 'problems',
            alias: '/',
            name: 'classroom-assignment-problems',
            component: require('./classroom/instructor/assignment/problems/problems.vue').default,
            meta: { protected: true },
          },
          {
            path: 'students',
            name: 'classroom-assignment-students',
            component: require('./classroom/instructor/assignment/students/students.vue').default,
            meta: { protected: true },
          },
        ],
      },
    ],
  },
];
