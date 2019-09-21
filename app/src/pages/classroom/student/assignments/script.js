import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('classroom/student');

export default {
  props: { classroom: Object },

  computed: {
    ...mapState(['classroomFetched', 'assignments', 'assignmentsFetched']),
    fetched() { return this.classroomFetched && this.assignmentsFetched; },
  },

  methods: {
    ...mapActions(['fetchAssignments', 'fetchAssignment']),
  },

  async mounted() {
    if (!this.assignmentsFetched) this.fetchAssignments();
  },

  components: {
    'assignment-list': require('../../common/assignment-list/assignment-list.vue').default,
  },
};
