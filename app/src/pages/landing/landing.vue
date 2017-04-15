<template>
  <div>
    <!-- Top nav bar -->
    <top-bar>
      <div slot="left"><router-link to="/">C</router-link></div>
      <div slot="right"><auth-buttons></auth-buttons></div>
    </top-bar>
    <!-- Center title -->
    <transition name="modal-header-fade">
      <h1 v-if="!($store.state.loginShown || $store.state.signupShown)">codus</h1>
    </transition>
    <!-- Background animation -->
    <starfield></starfield>
    <!-- Login form -->
    <modal v-if="$store.state.loginShown" v-on:close="$store.commit('toggleLoginModal')">
      <login></login>
    </modal>
    <!-- Sign up form -->
    <modal v-if="$store.state.signupShown" v-on:close="$store.commit('toggleSignupModal')">
      <signup></signup>
    </modal>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
