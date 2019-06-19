<template>
  <div class="classroom-route instructor-route" v-if="classroom !== null">
    <router-view
      v-bind:classroom="classroom"
      v-on:open-invitation="invitationOpen = true"
      v-on:create-assignment="assignmentCreationOpen = true"
      v-on:open-settings="settingsOpen = true"
    ></router-view>

    <classroom-invitation-modal
      v-bind:open="invitationOpen"
      v-on:close="invitationOpen = false"
      v-bind:classroom="classroom"
    ></classroom-invitation-modal>

    <assignment-creation-modal
      v-bind:open="assignmentCreationOpen"
      v-on:close="assignmentCreationOpen = false"
      v-bind:classroom="classroom"
    ></assignment-creation-modal>

    <classroom-settings-modal
      v-bind:open="settingsOpen"
      v-on:close="settingsOpen = false"
      v-bind:classroom="classroom"
    ></classroom-settings-modal>
  </div>

  <not-found v-else></not-found>
</template>

<script src="./script.js"></script>
