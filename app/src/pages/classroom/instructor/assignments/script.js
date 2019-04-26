import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('classroom/instructor');

export default {
  props: { classroom: Object },

  data: () => ({
    expandedId: null,
    dragging: false,
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
    ...mapActions(['reorderAssignments']),
  },

  components: {
    'assignment-list-item': require('./assignment-list-item/assignment-list-item.vue').default,
  },
};
