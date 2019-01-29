<template>
  <button v-bind:class="{ bg: type !== '', [type]: true }" v-on:click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: { type: String, default: '', validator: value => ['', 'green', 'red'].includes(value) },
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
