import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('classroom/instructor');

export default {
  props: { classroom: Object },

  computed: {
    classroomFetched() { return this.classroom.fetched || false; },
    id() { return this.$route.params.assignmentId; },
    assignment() {
      if (!this.classroomFetched) return false;
      return this.classroom.assignments.find(({ id }) => id === this.id);
    },
  },

  methods: {
    ...mapActions(['fetchAssignment']),
  },

  async created() {
    if (!this.classroomFetched) await new Promise(resolve => this.$watch('classroomFetched', (f) => { if (f) resolve(); }));
    this.fetchAssignment({
      classroom: this.classroom.code,
      id: this.id,
    });
  },
};
