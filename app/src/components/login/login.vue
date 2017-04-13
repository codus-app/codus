<template>
  <form v-on:keydown.enter="login">
    <div>
      <i class="material-icons">person</i>
      <input type="text" v-model="username" placeholder="username">
    </div>
    <div>
      <i class="material-icons">vpn_key</i>
      <input type="password" v-model="password" placeholder="password">
    </div>
    <a v-on:click="login">Sign in</a>
  </form>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
