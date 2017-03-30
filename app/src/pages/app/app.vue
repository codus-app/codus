<!-- Contains common code for all app routes -->

<template>
  <div class="component-root">
    <sidebar></sidebar>
    <router-view class="router-view"><!-- router-view class is for CSS selection --></router-view>
  </div>
</template>

<script>
import Vue from 'vue';

Vue.component('sidebar', require('../../components/sidebar/sidebar.vue'));

export default {};
</script>

<style scoped lang="sass" src="./style.sass"></style>
