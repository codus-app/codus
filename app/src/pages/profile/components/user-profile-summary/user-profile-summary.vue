<template>
  <div class="user-profile-summary">

    <div class="picture">
      <img ref="picture" v-bind:src="profile.picture">
    </div>

    <div class="name">{{ profile.name }}</div>
    <div class="username" v-if="profile.username">
      <icon-at-sign></icon-at-sign>
      {{ profile.username }}
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
