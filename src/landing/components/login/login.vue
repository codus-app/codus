<template>
  <form class="login-form" v-on:keydown.enter="login">
    <div class="input">
      <user-icon></user-icon>
      <input type="text" v-model="username" placeholder="username" ref="usernameInput">
    </div>
    <div class="input">
      <lock-icon></lock-icon>
      <input type="password" v-model="password" placeholder="password" ref="passwordInput">
    </div>
    <div class="error" v-if="Object.keys(error).length && error.code === 'access_denied'">{{ error.description }}</div>
    <a v-on:click="login">Sign in</a>
  </form>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
