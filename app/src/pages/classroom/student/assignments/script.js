import { createNamespacedHelpers, mapActions as mapBaseActions, mapState as mapBaseState } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('classroom/student');

export default {
  props: { classroom: Object },

  computed: {
    ...mapBaseState(['contentFetched']),
    ...mapState(['classroomFetched', 'assignments', 'assignmentsFetched']),
    fetched() { return this.classroomFetched && this.assignmentsFetched; },
  },

  methods: {
    ...mapBaseActions(['fetchContent']),
    ...mapActions(['fetchAssignments', 'fetchAssignment']),

    async fetch(assignment) {
      const fetches = [];
      if (!this.contentFetched) fetches.push(this.fetchContent());
      fetches.push(this.fetchAssignment(assignment.id));
      return (await Promise.all(fetches))[fetches.length - 1];
    },
  },

  async mounted() {
    if (!this.assignmentsFetched) this.fetchAssignments();
  },

  components: {
    'assignment-list': require('../../common/assignment-list/assignment-list.vue').default,
  },
};
