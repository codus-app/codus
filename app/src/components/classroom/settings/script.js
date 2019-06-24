import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('classroom/instructor');

export default {
  data: () => ({
    classroomName: '',
  }),

  props: { open: Boolean, classroom: Object },

  computed: {
    classroomInviteCode() { return this.classroom.code; },
  },

  methods: {
    ...mapActions(['regenerateCode']),
    codeRegen() { this.regenerateCode(this.classroom.code); },

    saveName() {
      console.log('hey!');
    },
  },

  watch: {
    classroom() { this.classroomName = this.classroom.name; },
  },
};
