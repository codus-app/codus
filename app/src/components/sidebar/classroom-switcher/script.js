
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapMutations } = createNamespacedHelpers('classroom/instructor');

export default {
  computed: {
    ...mapGetters(['selectedClassroom']),

    begForAttention() { return this.selectedClassroom === null; },
  },

  methods: {
    ...mapMutations(['switchClassroom']),
  },
};
