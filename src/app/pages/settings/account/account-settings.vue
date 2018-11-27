<template>
  <div class="account-settings" v-if="Object.keys(profile).length">
    <div class="card profile">
      <h2>Your profile</h2>
      <div class="picture" v-bind:style="{ backgroundImage: `url(${profile.picture})` }"></div>
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
        <password-reset></password-reset>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
