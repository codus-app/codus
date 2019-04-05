export default {
  props: { classroom: Object },

  computed: {
    fetched() { return this.classroom.fetched || false; },
    students() { return this.classroom.students || []; },
    selectedStudent() {
      return this.students
        .find(({ username }) => username && username === this.$route.params.username)
        || null;
    },
  },

  components: {
    'user-profile': require('../../../profile/profile.vue').default,
  },

  watch: {
    students(students, oldStudents) {
      const usernames = students.map(s => s.username);
      const oldUsernames = oldStudents.map(s => s.username);
      const { username } = this.$route.params;
      if (username && oldUsernames.includes(username) && !usernames.includes(username)) {
        this.$router.replace({
          name: 'classroom-students',
          params: { ...this.$route.params, username: undefined },
        });
      }
    },
  },
};
