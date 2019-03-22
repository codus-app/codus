
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('classroom/instructor');

export default {
  data: () => ({
    open: false,
    shouldTransition: false,
    managing: false,
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

  watch: {
    open(open) {
      setTimeout(() => { this.shouldTransition = open; }, open ? 150 : 0);
      if (!open) this.managing = false;
    },
  },

  methods: {
    ...mapMutations(['switchClassroom']),
  },
    closeOnClick(e) {
      if (!this.$el.contains(e.target)) this.open = false;
    },
  },

  created() { document.body.addEventListener('click', this.closeOnClick); },
  destroyed() { document.body.removeEventListener('click', this.closeOnClick); },
};
