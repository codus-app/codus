<template>
  <div class="account-settings" v-if="Object.keys(profile).length">
    <div class="card profile">
      <h2>Your profile</h2>

      <profile-picture-upload
        v-bind:url="profile.picture"
        v-on:file="newImage = $event"
      ></profile-picture-upload>

      <div class="group">
        <text-input
          title="Username"
          v-model="username"
          placeholder="Username"
          v-bind:status="usernameStatus"
          v-bind:message="usernameMessage"
        ></text-input>

        <text-input
          title="Display Name"
          v-model="name"
          placeholder="Name"
          v-bind:status="nameStatus"
          v-bind:message="nameMessage"
        ></text-input>
      </div>
    </div>

    <div class="card account">
      <h2>Your account</h2>
      <div class="group">
        <text-input
          title="Email"
          v-model="email"
          placeholder="Email address"
          v-bind:status="emailStatus"
          v-bind:message="emailMessage"
        ></text-input>
        <password-reset v-bind:email="email"></password-reset>
      </div>
    </div>

    <save-button
      v-bind:onClick="save"
      v-bind:enabled="canSave"
      v-bind:text="changed ? 'Save' : 'Saved'"
      v-on:saved="saved"
      v-on:error="errored"
    ></save-button>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
