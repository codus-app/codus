<template>
  <button v-bind:class="{ bg: type !== '', [type]: true }" v-on:click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: { type: String, default: '', validator: value => ['', 'green', 'red', 'gray'].includes(value) },
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
