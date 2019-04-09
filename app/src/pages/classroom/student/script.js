import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('classroom/student');

export default {
  computed: {
    ...mapState(['classroom']),
  },
};
