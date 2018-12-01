<template>
  <form class="signup-form" v-on:keydown.enter="signup">
    <!-- Display name -->
    <div class="input">
      <user-icon></user-icon>
      <input type="text" v-model="name" placeholder="name">
    </div>
    <!-- Email -->
    <div class="input">
      <mail-icon></mail-icon>
      <input type="text" v-model="email" placeholder="email">
    </div>
    <!-- Username -->
    <div class="input">
      <at-sign-icon></at-sign-icon>
      <input type="text" v-model="username" placeholder="username">
    </div>
    <!-- Password -->
    <div class="input">
      <lock-icon></lock-icon>
      <input type="password" v-model="password" placeholder="password">
    </div>
    <div class="error" v-if="errors && errors.length">
      <div v-for="(err, i) in errors" v-bind:key="i">{{ err.key[0].toUpperCase() + err.key.substring(1) }}: {{err.message}}</div>
    </div>
    <!-- Sign up -->
    <a v-on:click="signup">Sign up</a>
  </form>
</template>

<script src="./script.js"></script>
<style scoped lang="sass">

@import '../login/style.sass'

form .error
  margin-top: 1em
  position: static

</style>
