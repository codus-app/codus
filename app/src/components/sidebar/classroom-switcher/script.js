
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapMutations } = createNamespacedHelpers('classroom/instructor');

export default {
  computed: {
    ...mapGetters(['selectedClassroom']),
  },

  methods: {
    ...mapMutations(['switchClassroom']),
  },
};
