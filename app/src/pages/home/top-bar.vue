<template>
  <div v-on:click="openModal">Log In</div>
</template>

<script>
export default {
  methods: {
    openModal() {
      window.bus1.$emit('showModal');
    },
  },
};
</script>

<style scoped lang="sass">
  div
    cursor: pointer
</style>
