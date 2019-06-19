export default {
  props: { open: Boolean, classroom: Object },

  computed: {
    classroomName() { return this.classroom.name; },
    classroomInviteCode() { return this.classroom.code; },
  },
};
