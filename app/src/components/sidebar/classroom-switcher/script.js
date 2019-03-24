
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('classroom/instructor');

export default {
  data: () => ({
    open: false,
    shouldTransition: false,
    managing: false,
    classroomDeleting: null, // The classroom to be deleted; stored while confirmation modal is open
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
    ...mapActions(['deleteClassroom']),

    createClassroom() {
      this.$emit('createClassroom');
    },

    closeOnClick(e) {
      // Clicks inside these elements won't close the dropdown
      const whitelist = [this.$el, this.$refs.deletionModal.$el2];
      if (!whitelist.some(el => el.contains(e.target))) this.open = false;
    },
  },

  created() { document.body.addEventListener('click', this.closeOnClick); },
  destroyed() { document.body.removeEventListener('click', this.closeOnClick); },
};
