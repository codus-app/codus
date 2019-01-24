<template>
  <div class="password-reset">
    <label class="title" v-bind:for="_uid">Password</label>
    <button type="button"
      v-on:click="onClick"
      v-bind:id="_uid"
      v-bind:disabled="disabled"
    >Reset password</button>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
