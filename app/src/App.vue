<template>
  <div class="component-root">
    <sidebar v-if="isAuthenticated" v-bind:collapsed="$route.meta.collapseSidebar"></sidebar>
    <div class="route-container">
      <router-view class="router-view"><!-- router-view class is for CSS selection --></router-view>
    </div>
    <portal-target multiple name="modal-target" id="modal-target"></portal-target>
  </div>
</template>

<script src="./script.js"></script>
