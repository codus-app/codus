<template>
  <div class="page">
    <div class="top">
      <div class="summary card">
        <user-profile-summary v-bind:profile="profile"></user-profile-summary>
      </div>
      <div class="detail card c1"></div>
      <div class="detail card c2"></div>
      <div class="detail card c3"></div>
      <div class="detail card c4"></div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
