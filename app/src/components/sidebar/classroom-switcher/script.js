
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers('classroom/instructor');

export default {
  data: () => ({
    open: false,
    shouldTransition: false,
    managing: false,

    classroomDeletion: {
      open: false,
      classroom: null, // The classroom to be deleted; stored while confirmation modal is open
    },
    classroomCreation: {
      open: false,
      name: '',
    },
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

    selectedClassroom() { this.open = false; },
  },

  methods: {
    ...mapMutations({ _switchClassroom: 'switchClassroom' }),
    ...mapActions(['deleteClassroom', 'createClassroom']),

    switchClassroom(classroomCode) {
      this._switchClassroom(classroomCode);
      // Replace classroom in route with new classroom
      if (this.$route.params.classroomCode) {
        this.$router.push({
          name: this.$route.name,
          params: { ...this.$route.params, classroomCode },
          query: this.$route.query,
        });
      }
    },

    linkToClassroom(classroomCode) {
      return this.$router.resolve({
        name: this.$route.params.classroomCode ? this.$route.name : 'classroom-overview',
        params: { ...this.$route.params, classroomCode },
        query: this.$route.query,
      }).route.fullPath;
    },

    closeOnClick(e) {
      // Clicks inside these elements won't close the dropdown
      const whitelist = [this.$el, this.$refs.creationModal.$el2, this.$refs.deletionModal.$el2];
      if (!whitelist.some(el => el && el.contains(e.target))) this.open = false;
    },

    classroomCreated(classroom) {
      this.classroomCreation.name = '';
      this.classroomCreation.open = false;
      this.switchClassroom(classroom.code);
      this.open = false;
    },
  },

  created() { document.body.addEventListener('click', this.closeOnClick); },
  destroyed() { document.body.removeEventListener('click', this.closeOnClick); },
};
