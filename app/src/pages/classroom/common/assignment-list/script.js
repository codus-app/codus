export default {
  props: {
    assignments: Array,
    fetched: Boolean,
  },

  data: () => ({
    expandedId: null,
    dragging: false,
    // Collapse open element temporarily while maintaining info on which one was open
    overrideCollapse: false,
    // “Delete assignment” confirmation modal
    assignmentDeletion: { open: false, assignment: null },
  }),

  computed: {
  },

  methods: {
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

  created() {
    this.$on('deletionComplete', () => {
      this.assignmentDeletion.open = false;
    });
  },

  components: {
    'assignment-list-item': require('./assignment-list-item/assignment-list-item.vue').default,
    'empty-message': require('../empty/empty.vue').default,
  },
};
