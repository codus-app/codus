<template>
  <div>
    <!-- Top nav bar -->
    <top-bar>
      <div slot="left"><router-link to="/">C</router-link></div>
      <div slot="right">
        <auth-buttons v-on:login="$refs.loginModal.show()" v-on:signup="$refs.signupModal.show()"></auth-buttons>
      </div>
    </top-bar>
    <!-- Center title -->
    <transition name="modal-header-fade">
      <h1 v-if="showTitle">codus</h1>
    </transition>
    <!-- Background animation -->
    <starfield></starfield>
    <!-- Login form -->
    <modal ref="loginModal">
      <login></login>
    </modal>
    <!-- Sign up form -->
    <modal ref="signupModal">
      <signup></signup>
    </modal>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
