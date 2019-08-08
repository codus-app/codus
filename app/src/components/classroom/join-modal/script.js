import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('classroom/student');

export default {
  props: { open: Boolean },

  data: () => ({
    codeToJoin: '',
  }),

  computed: mapState(['classroom']),
  methods: mapActions(['joinClassroom']),
};
