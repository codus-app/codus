import { createNamespacedHelpers, mapMutations } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('classroom/instructor');

export default {
  data: () => ({
    invitationOpen: false,
  }),

  computed: {
    ...mapGetters(['getClassroom']),
    code() { return this.$route.params.classroomCode; },
    classroom() { return this.getClassroom(this.code); },
  },

  methods: {
    ...mapActions(['fetchClassroom']),
    ...mapMutations(['userFetched']),
    async fetch() {
      if (this.classroom !== null && !this.classroom.fetched) await this.fetchClassroom(this.code);
      this.classroom.students.forEach(s => this.userFetched(s));
    },
  },

  // Fetch each classroom that's not fetched
  created() { this.fetch(); },
  watch: { code() { this.fetch(); } },

  components: {
    'not-found': require('../../404/404.vue').default,
  },
};
