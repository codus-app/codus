<template>
  <router-link
    class="sidebar-user-profile" v-bind:class="{ compact }"
    v-bind:to="`/user/${profile.username || profile.nickname}`"
  >
    <div class="picture" v-bind:style="{ backgroundImage: `url(${profile.picture})` }"></div>
    <div class="name" v-if="!compact">{{ profile.name }}</div>
    <div class="role-badge" v-if="profile.role === 'instructor'">{{ profile.role }}</div>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: { compact: Boolean },
  computed: {
    ...mapGetters(['profile']),
  },
};
</script>
<style scoped lang="sass" src="./style.sass"></style>
