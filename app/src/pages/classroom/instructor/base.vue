<template>
  <div class="classroom-route instructor-route" v-if="classroom !== null">
    <router-view v-on:open-invitation="invitationOpen = true"></router-view>

    <classroom-invitation-modal
      v-bind:open="invitationOpen"
      v-on:close="invitationOpen = false"
      v-bind:classroom="classroom"
    ></classroom-invitation-modal>
  </div>

  <not-found v-else></not-found>
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

  components: {
    'not-found': require('../../404/404.vue').default,
  },
};

</script>
