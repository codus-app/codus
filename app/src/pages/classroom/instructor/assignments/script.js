export default {
  props: { classroom: Object },

  computed: {
    fetched() { return this.classroom.fetched || false; },
    assignments() { return this.classroom.assignments || []; },
  },

  components: {
    'assignment-list-item': require('./assignment-list-item/assignment-list-item.vue').default,
  },
};
