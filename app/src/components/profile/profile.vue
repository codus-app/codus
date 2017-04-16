<template>
  <div class="profile">
    <img v-bind:src="profile.picture" class="profile-image">
    <div class="profile-name">{{ profile.user_metadata.name }}</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    profile: JSON.parse(localStorage.getItem('profile')),
  }),
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
