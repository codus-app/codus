import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('classroom/instructor');

export default {
  props: { classroom: Object },

  data: () => ({
    expandedId: null,
    // True from when the user starts actually dragging an item until the user drops the item
    dragging: false,
    // True from when the user starts dragging an item OR presses down on the drag handle until the
    // user drops the item
    dragActive: false,
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

    dragPress() {
      this.dragActive = true;
      const release = () => {
        this.dragActive = false;
        document.removeEventListener('mouseup', release);
      };
      document.addEventListener('mouseup', release);
    },
  },

  components: {
    'assignment-list-item': require('./assignment-list-item/assignment-list-item.vue').default,
  },
};
