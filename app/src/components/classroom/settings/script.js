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
    ...mapActions(['renameClassroom', 'regenerateCode']),
    codeRegen() { this.regenerateCode(this.classroom.code); },

    saveName() {
      this.renameClassroom({ code: this.classroom.code, newName: this.classroomName });
    },
  },

  watch: {
    classroom() { this.classroomName = this.classroom.name; },
  },
};
