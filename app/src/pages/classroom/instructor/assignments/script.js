export default {
  props: { classroom: Object },

  computed: {
    fetched() { return this.classroom.fetched || false; },
    assignments() { return this.classroom.assignments || []; },
  },
};
