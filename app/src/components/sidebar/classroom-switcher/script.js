
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('classroom/instructor');

export default {
  data: () => ({
    open: false,
  }),

  computed: {
    ...mapGetters(['selectedClassroom']),
    ...mapState(['classrooms']),

    begForAttention() { return this.selectedClassroom === null; },
    sortedClassrooms() {
      return [
        // First the selected classroom (if there is one)
        ...this.selectedClassroom ? [this.selectedClassroom] : [],
        // Then the other classrooms sorted by name
        ...this.classrooms
          .filter(({ code }) => code !== (this.selectedClassroom || {}).code)
          .sort(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
      ];
    },
  },

  methods: {
    ...mapMutations(['switchClassroom']),
  },
};
