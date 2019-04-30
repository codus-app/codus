<template>
  <modal
    v-bind:open="open"
    v-on:close="$emit('close')"
    v-bind:modalStyle="{
      backgroundColor: '#131313',
      padding: '3rem 3.5rem',
      marginRight: '-12rem',
      // Window width - sidebar width - 3rem minimum margin on both sides
      width: 'calc(100vw - 12rem - (3rem * 2))',
      maxWidth: '38rem',
    }"
    fade-color="rgba(30, 30, 33, .65)"
  >
    <page-1 v-if="page === 1"></page-1>

    <page-2 v-else-if="page === 2"></page-2>

    <page-3 v-else-if="page === 3"></page-3>
  </modal>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
