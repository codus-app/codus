import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('classroom/instructor');

export default {
  data: () => ({ }),

  computed: {
    ...mapGetters(['getClassroom']),
    code() { return this.$route.params.classroomCode; },
    classroom() { return this.getClassroom(this.code); },
    fetched() { return this.classroom.fetched || false; },
    students() { return this.classroom.students || []; },
    assignments() { return this.classroom.assignments || []; },
  },

  methods: {
    ...mapActions(['fetchClassroom']),
    fetch() {
      if (!this.classroom.fetched) this.fetchClassroom(this.code);
    },
  },

  // Fetch each classroom that's not fetched
  created() { this.fetch(); },
  watch: { code() { this.fetch(); } },
};
