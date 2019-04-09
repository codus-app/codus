import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('classroom/student');

export default {
  computed: {
    ...mapState(['classroom', 'classroomFetched']),
  },

  components: {
    'not-found': require('../../404/404.vue').default,
  },
};
