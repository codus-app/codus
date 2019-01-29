<template>
  <div class="modal-wrapper" v-bind:class="{ open }">
    <div class="scrim" v-bind:style="{ backgroundColor: fadeColor }"></div>

    <div class="modal">
      <icon-x v-on:click="$emit('close')"></icon-x>

      <!-- Header -->
      <div class="header">
        <slot name="header"></slot>
      </div>
      <!-- Content -->
      <p>
        <slot></slot>
      </p>
      <!-- Buttons -->
      <div class="buttons">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
