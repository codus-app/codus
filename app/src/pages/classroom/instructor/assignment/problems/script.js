export default {
  props: ['classroom', 'assignment'],

  components: {
    'problem-summary': require('./problem-summary/problem-summary.vue').default,
  },
};
