<template>
  <div>
    <top-bar>
      <div slot="left"><router-link to="/">C</router-link></div>
      <div slot="right"><auth-buttons></auth-buttons></div>
    </top-bar>
    <transition name="modal-header-fade">
      <h1 v-if="!($store.state.loginShown || $store.state.signupShown)">codus</h1>
    </transition>
    <starfield></starfield>
    <modal bgcolor="rgba(0, 0, 0, 0.75)" v-if="$store.state.loginShown" v-on:close="$store.commit('toggleLoginModal')">
      <login></login>
    </modal>
    <modal bgcolor="rgba(0, 0, 0, 0.75)" v-if="$store.state.signupShown" v-on:close="$store.commit('toggleSignupModal')">
      <signup></signup>
    </modal>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
