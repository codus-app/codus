import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('classroom/instructor');

export default {
  props: { classroom: Object },

  data: () => ({
    expandedId: null,
    dragging: false,
    // Collapse open element temporarily while maintaining info on which one was open
    overrideCollapse: false,
    // “Delete assignment” confirmation modal
    assignmentDeletion: { open: false, assignment: null },
  }),

  computed: {
    fetched() { return this.classroom.fetched || false; },
    assignments: {
      get() { return this.classroom.assignments || []; },
      set(value) {
        this.reorderAssignments({
          classroom: this.classroom.code,
          ids: value.map(assignment => assignment.id),
        });
      },
    },
  },

  methods: {
    ...mapActions(['reorderAssignments', 'deleteAssignment']),

    dragPress(id) {
      if (id === this.expandedId) {
        this.overrideCollapse = true;
        const release = () => {
          this.overrideCollapse = false;
          document.removeEventListener('mouseup', release);
        };
        document.addEventListener('mouseup', release);
      }
    },
  },

  components: {
    'assignment-list-item': require('./assignment-list-item/assignment-list-item.vue').default,
  },
};
