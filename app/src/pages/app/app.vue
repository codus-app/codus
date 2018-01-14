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
import routes from './routes';

Vue.component('sidebar', require('../../components/sidebar/sidebar.vue').default);

export default {
  data: () => ({
    transitionName: 'route-slide-down',
  }),
  watch: {
    $route(to, from) {
      const paths = routes.map(x => x.path);
      if (paths.indexOf(to.path) < paths.indexOf(from.path)) {
        this.transitionName = 'route-slide-down';
      } else {
        this.transitionName = 'route-slide-up';
      }
    },
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
<style scoped lang="sass" src="./route-transitions.sass"></style>
