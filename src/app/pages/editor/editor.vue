<template>
  <div class="editor-page">
    <!-- Problem browser -->
    <div class="problem-browser">
      <div class="top-bar">Problems</div>
      <problems-tree class="listing"></problems-tree>
    </div>

    <!-- Code editing -->
    <div class="editor">
      <div class="top-bar">
        <icon-play class="button"/>
        <icon-trash class="button"/>
        <icon-share class="button"/>
        <icon-settings class="button"/>
        <save-status v-if="$store.state.userFetched" v-bind:saving="saving"/>
      </div>
      <codemirror v-bind:value="code" v-on:input="onInput" v-bind:options="cmOptions"></codemirror>
    </div>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>

<!-- This can't be scoped so it gets its own style tag -->
<style lang="sass">
  @import style

  .sidebar.collapsed
    top: $bar-width + $gap
    height: calc(100vh - #{$bar-width + $gap})

    &::before
      content: ''
      background: $dark-1
      position: absolute
      top: -#{$bar-width + $gap}
      left: 0
      width: $bar-width
      height: $bar-width
</style>
