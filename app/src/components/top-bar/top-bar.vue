<template>
  <div class="top-bar" v-bind:class="{ dark }">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dark: false,
    }),
    methods: {
      toggleDark() {
        this.dark = !this.dark;
      },
    },
  };
</script>

<style scoped lang="sass" src="./style.sass"></style>
