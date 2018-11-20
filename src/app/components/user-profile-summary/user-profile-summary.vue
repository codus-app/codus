<template>
  <div class="user-profile-summary">
    <div class="picture" v-bind:style="{ backgroundImage: `url(${profile.picture})` }"></div>
    <div class="name">{{ profile.name }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({ profile: state => state.user.profile }),
  },
};
</script>
<style scoped lang="sass" src="./style.sass"></style>
