export default {
  props: { classroom: Object },

  data: () => ({
    expandedId: null,
    assignments: [],
  }),

  computed: {
    fetched() { return this.classroom.fetched || false; },
  },

  watch: {
    fetched() {
      this.assignments = this.classroom.assignments;
    },
  },

  components: {
    'assignment-list-item': require('./assignment-list-item/assignment-list-item.vue').default,
  },
};
