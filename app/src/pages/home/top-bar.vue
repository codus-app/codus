<template>
  <div v-on:click="openModal" v-if='loggedIn'>Log In</div>
</template>

<script>
import auth from '../../scripts/auth';

export default {
  methods: {
    openModal() {
      window.bus1.$emit('showModal');
    },
  },
  data: () => ({
    loggedIn: auth.isAuthenticated,
  }),
};
</script>

<style scoped lang="sass">
  div
    cursor: pointer
</style>
