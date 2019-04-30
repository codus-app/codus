export default {
  props: {
    open: Boolean,
  },

  data: () => ({
    page: 1,
  }),

  components: {
    'page-1': require('./pages/1/page-1.vue').default,
    'page-2': require('./pages/2/page-2.vue').default,
    'page-3': require('./pages/3/page-3.vue').default,
  },
};
