<template>
  <div class="confirm-modal" v-bind:class="{ open }">
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
      <button class="button" v-on:click="onCancel">Cancel</button>
      <slot name="button">
        <button class="button bg green" v-on:click="onSubmit">Ok</button>
      </slot>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
