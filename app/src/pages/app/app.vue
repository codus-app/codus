<!-- Contains common code for all app routes -->

<template>
  <div class="component-root">
    <sidebar></sidebar>
    <div class="route-container">
      <transition :name="transitionName">
        <router-view class="router-view"><!-- router-view class is for CSS selection --></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

Vue.component('sidebar', require('../../components/sidebar/sidebar.vue'));

export default {
  data: () => ({
    transitionName: 'route-slide-down',
  }),
  watch: {
    $route(to, from) {
      console.log(to, from);
    },
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
<style scoped lang="sass" src="./route-transitions.sass"></style>
