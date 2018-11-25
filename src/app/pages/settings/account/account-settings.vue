<template>
  <div class="account-settings">
    <div class="card profile">
      <h2>Your profile</h2>
      <div class="picture" v-bind:style="{ backgroundImage: `url(${profile.picture})` }"></div>
      <div class="group">
        <text-input
          title="Username"
          v-model="username"
          placeholder="Username"
          :status="usernameStatus"
          :message="usernameMessage"
        ></text-input>

        <text-input
          title="Display Name"
          v-model="name"
          placeholder="Name"
        ></text-input>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
