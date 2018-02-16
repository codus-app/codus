<template>
  <form class="login-form" v-on:keydown.enter="login">
    <div>
      <i data-feather="user"></i>
      <input type="text" v-model="username" placeholder="username" ref="usernameInput">
    </div>
    <div>
      <i data-feather="lock"></i>
      <input type="password" v-model="password" placeholder="password" ref="passwordInput">
    </div>
    <a v-on:click="login">Sign in</a>
  </form>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
