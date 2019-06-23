<template>
  <modal
    v-bind:open="open"
    v-on:close="$emit('close')"
    v-bind:modalStyle="{
      backgroundColor: '#131313',
      padding: '1rem',
      marginRight: '-12rem',
      padding: '1rem 3.75rem 2.5rem',
    }"
    fade-color="rgba(30, 30, 33, .65)"
    v-bind:wide="true"
  >
    <template v-slot:header><h2>Classroom settings</h2></template>
    <div class="controls">

      <div class="group classroom-name">
        <text-input
          title="Classroom name"
          placeholder="Enter a name"
          v-model="classroomName"
        ></text-input>
        <bold-button type="green">Save</bold-button>
      </div>

      <div class="group invite-code">
        <text-input
          title="Invite code"
          v-bind:value="classroomInviteCode"
          disabled
          ref="inviteInput"
        ></text-input>
        <bold-button type="green" v-on:click="codeRegen">Regenerate</bold-button>
      </div>
    </div>
  </modal>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
