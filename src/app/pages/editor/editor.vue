<template>
  <div class="editor">
    <div class="top-bar"></div>

    <codemirror v-model="code" v-bind:options="cmOptions"></codemirror>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>

<style lang="sass">
  @import style

  .sidebar.collapsed
    top: $bar-width + $gap
    height: calc(100vh - #{$bar-width + $gap})
</style>
