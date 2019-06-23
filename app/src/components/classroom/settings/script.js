import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('classroom/instructor');

export default {
  props: { open: Boolean, classroom: Object },

  computed: {
    classroomName() { return this.classroom.name; },
    classroomInviteCode() { return this.classroom.code; },
  },

  methods: {
    ...mapActions(['regenerateCode']),
    codeRegen() { this.regenerateCode(this.classroom.code); },
  },
};
