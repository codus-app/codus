<template>
  <div class="root">
    <div class="sidebar">
      <div class="profile">
        <img src="https://arkisio.now.sh/profile/Conqueror1776" class="profile-image">
        <div class="profile-name">Elijah Tamarchenko</div>
      </div>

      <router-link class="sidebar-link" to="/app" exact>
        <i class="material-icons">home</i> Home
      </router-link>
      <router-link class="sidebar-link" to="/app/practice">
        <i class="material-icons">code</i> Practice
      </router-link>
    </div>

    <router-view class="router-view"><!-- router-view class is for CSS selection --></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="sass" src="./style.sass"></style>
