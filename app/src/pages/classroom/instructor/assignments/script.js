import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('classroom/instructor');

export default {
  props: { classroom: Object },

  methods: {
    ...mapActions(['reorderAssignments', 'deleteAssignment']),
  },

  components: {
    'assignment-list': require('../../common/assignment-list/assignment-list.vue').default,
  },
};
