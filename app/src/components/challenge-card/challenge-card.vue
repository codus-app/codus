<template>
  <div class="card">
    <slot name="top"></slot>
    <div class="middle">
      <binary-background></binary-background>
      <slot name="title"></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script> export default {} </script>

<style scoped lang="sass" src="./style.sass"></style>
