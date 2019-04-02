export default {
  props: { classroom: Object },

  computed: {
    fetched() { return this.classroom.fetched || false; },
    students() { return this.classroom.students || []; },
    assignments() { return this.classroom.assignments || []; },
  },
};
