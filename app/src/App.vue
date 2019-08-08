<template>
  <div class="component-root">
    <sidebar v-if="$root.isAuthenticated" v-bind:collapsed="$route.meta.collapseSidebar"></sidebar>
    <div class="route-container">
      <router-view class="router-view"><!-- router-view class is for CSS selection --></router-view>
    </div>
    <portal-target multiple name="modal-target" id="modal-target"></portal-target>

    <classroom-join-modal
      v-if="$root.role === 'student'"
      v-bind:open="$root.classroomJoinOpen"
      v-on:close="$root.classroomJoinOpen = false"
    ></classroom-join-modal>
  </div>
</template>
