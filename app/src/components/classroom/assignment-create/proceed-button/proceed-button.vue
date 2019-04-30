<template>
  <div
    class="proceed-button"
    v-on:click="$emit('click', $event)"
    v-bind:class="{ disabled }"
  >
    <div class="label"><slot name="label"></slot></div>
    <div class="title"><slot></slot></div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
