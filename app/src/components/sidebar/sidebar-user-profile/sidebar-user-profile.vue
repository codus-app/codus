<template>
  <router-link v-bind:to="`/user/${this.profile.username || this.profile.nickname}`" class="sidebar-user-profile" v-bind:class="{ compact }">
    <div class="picture" v-bind:style="{ backgroundImage: `url(${profile.picture})` }"></div>
    <div class="name" v-if="!compact">{{ profile.name }}</div>
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
