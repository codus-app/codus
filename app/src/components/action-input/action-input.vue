<template>
  <div class="action-input" v-bind:class="{ failed }">
    <input
      type="text"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      v-bind:placeholder="placeholder"
    >
    <button v-on:click="click">
      <slot>Submit</slot>
    </button>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
