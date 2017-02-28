<template>
  <div class="top-bar" v-bind:class="{ dark }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dark: false
    }),
    methods: {
      toggleDark() {
        this.dark = !this.dark;
      }
    },
  };
</script>

<style scoped lang="sass" src="./style.sass"></style>
