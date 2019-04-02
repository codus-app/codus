<template>
  <div class="classroom-route instructor-route" v-if="classroom !== null">
    <router-view
      v-bind:classroom="classroom"
      v-on:open-invitation="invitationOpen = true"
    ></router-view>

    <classroom-invitation-modal
      v-bind:open="invitationOpen"
      v-on:close="invitationOpen = false"
      v-bind:classroom="classroom"
    ></classroom-invitation-modal>
  </div>

  <not-found v-else></not-found>
</template>

<script src="./script.js"></script>
