import { createNamespacedHelpers } from 'vuex';
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('classroom/instructor');

export default {
  data: () => ({
    invitationOpen: false,
  }),

  computed: {
    ...mapGetters(['getClassroom']),
    ...mapState(['classroomsFetched']),
    code() { return this.$route.params.classroomCode; },
    classroom() { return this.getClassroom(this.code); },
    fetched() { return this.classroom.fetched || false; },
    students() { return this.classroom.students || []; },
  },

  methods: {
    ...mapActions(['fetchClassroom']),
    async fetch() {
      if (this.classroom !== null && !this.classroom.fetched) await this.fetchClassroom(this.code);
    },
  },

  // Fetch each classroom that's not fetched
  created() { this.fetch(); },
  watch: { code() { this.fetch(); } },

  components: {
    'not-found': require('../../../404/404.vue').default,
  },
};
