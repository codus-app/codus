<template>
  <form class="login-form" v-on:keydown.enter="login">
    <div>
      <user-icon></user-icon>
      <input type="text" v-model="username" placeholder="username" ref="usernameInput">
    </div>
    <div>
      <lock-icon></lock-icon>
      <input type="password" v-model="password" placeholder="password" ref="passwordInput">
    </div>
    <a v-on:click="login">Sign in</a>
  </form>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
