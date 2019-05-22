export default {
  props: ['classroom', 'assignment'],

  data: () => ({
    expandedProblem: null,
  }),

  components: {
    'problem-summary': require('./problem-summary/problem-summary.vue').default,
  },
};
