<template>
  <form>
    <div>
      <i class="icon ion-person"></i>
      <input type="text" v-model="username" placeholder="username">
    </div>
    <div>
      <i class="icon ion-locked"></i>
      <input type="password" v-model="password" placeholder="password">
    </div>
    <a v-on:click="login">Sign in</a>
  </form>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
