import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('classroom/instructor');

export default {
  props: { classroom: Object },

  data: () => ({
    dateFormat: { month: 'short', day: 'numeric' },
    expandedProblem: null,
  }),

  computed: {
    params() { return this.$route.params; },
    classroomFetched() { return this.classroom.fetched || false; },
    id() { return this.$route.params.assignmentId; },
    assignment() {
      if (!this.classroomFetched) return null;
      return this.classroom.assignments.find(({ id }) => id === this.id) || null;
    },
    assignmentFetched() { return (this.assignment || {}).fetched || false; },
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

  watch: {
    classroom(classroom, oldClassroom) {
      const [oldIds, newIds] = [oldClassroom, classroom]
        .map(c => (c.assignments || []).map(a => a.id));
      if (oldIds.includes(this.id) && !newIds.includes(this.id)) {
        this.$router.replace({ name: 'classroom-assignments', params: this.params });
      }
    },
  },

  components: {
    'problem-summary': require('./problem-summary/problem-summary.vue').default,
    'not-found': require('../../../404/404.vue').default,
  },
};
