<!-- Contains common code for all app routes -->

<template>
  <div class="component-root">
    <sidebar></sidebar>
  </div>
</template>

<script>
import Vue from 'vue';

Vue.component('sidebar', require('./sidebar/sidebar.vue'));

export default {};
</script>

<style scoped lang="sass" src="./style.sass"></style>
