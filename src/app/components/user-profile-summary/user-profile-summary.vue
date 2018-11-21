<template>
  <div class="user-profile-summary" v-bind:class="compact">
    <div class="picture" v-bind:style="{ backgroundImage: `url(${profile.picture})` }"></div>
    <div class="name" v-if="!compact">{{ profile.name }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: { compact: Boolean },
  computed: {
    ...mapState({ profile: state => state.user.profile }),
  },
};
</script>
<style scoped lang="sass" src="./style.sass"></style>
