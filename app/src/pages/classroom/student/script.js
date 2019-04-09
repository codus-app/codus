import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('classroom/student');

export default {
  computed: {
    ...mapState(['classroom']),
  },

  methods: {
    ...mapActions(['fetchClassroom']),
  },

  created() {
    if (this.classroom === null) this.fetchClassroom();
  },
};
