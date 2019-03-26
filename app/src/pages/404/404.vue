<template>
  <div class="not-found">
    <div class="message">
      <h1>404</h1>
      <h3>There's nothing here!</h3>
      <router-link
        to="/"
        v-on:mouseenter.native="linkHovered = true"
        v-on:mouseleave.native="linkHovered = false"
      >Go home</router-link>
    </div>

    <div class="rings" v-bind:class="{ active: linkHovered }">
      <div class="ring" v-for="i in 7" v-bind:key="i"></div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
