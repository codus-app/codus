export default {
  props: { classroom: Object },

  computed: {
    fetched() { return this.classroom.fetched || false; },
    students() { return this.classroom.students || []; },
    selectedStudent() {
      return this.students
        .find(({ username }) => username === this.$route.params.username);
    },
  },
};
