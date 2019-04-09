import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('classroom/instructor');

export default {
  props: { classroom: Object },

  data() {
    return {
      studentRemoval: { open: false, student: null },

      profileContextItems: [
        { icon: 'external-link', label: 'View full profile', onclick: this.visitFullProfile },
        { icon: 'user-x', label: 'Remove', onclick: this.startStudentRemoval },
      ],
    };
  },

  computed: {
    fetched() { return this.classroom.fetched || false; },
    students() { return this.classroom.students || []; },
    selectedStudent() {
      return this.students
        .find(({ username }) => username && username === this.$route.params.username)
        || null;
    },
  },

  methods: {
    ...mapActions(['removeUser']),
    visitFullProfile() {
      this.$router.push({ name: 'profile', params: { username: this.$route.params.username } });
    },
    startStudentRemoval() {
      this.studentRemoval.student = this.selectedStudent;
      this.studentRemoval.open = true;
    },
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

  components: {
    'user-profile': require('../../../profile/profile.vue').default,
  },
};
