<template>
  <div class="classroom-route instructor-route">
    <router-view v-on:open-invitation="invitationOpen = true"></router-view>

    <classroom-invitation-modal
      v-bind:open="invitationOpen"
      v-on:close="invitationOpen = false"
      v-bind:classroom="classroom"
    ></classroom-invitation-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('classroom/instructor');

export default {
  data: () => ({
    invitationOpen: false,
  }),

  computed: {
    ...mapGetters(['getClassroom']),
    code() { return this.$route.params.classroomCode; },
    classroom() { return this.getClassroom(this.code); },
  },
};

</script>
