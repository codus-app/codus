<template>
  <router-link class="profile-chip" v-bind:to="{ name: 'profile', params: { username }}">
    <div class="picture" v-bind:style="{
      backgroundImage: `url(${picture})`,
      // Darken the default avatar image for contrast with the background
      ...picture.endsWith('avatar.svg') && { filter: 'brightness(90%)' },
    }"></div>
    <div class="name">{{ name }}</div>
  </router-link>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
