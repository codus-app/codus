<template>
  <div>
    <div v-on:click="openModal" v-if='!loggedIn'>Log In</div>
    <div v-on:click="auth.logout()" v-if='loggedIn'>Log Out</div>
  </div>
</template>

<script>
import auth from '../../scripts/auth';

export default {
  methods: {
    openModal() {
      window.bus1.$emit('showModal');
    },
  },

  created() {
    auth.bus.$on('login', () => { this.loggedIn = true; });
    auth.bus.$on('logout', () => { this.loggedIn = false; });
  },

  data: () => ({
    loggedIn: auth.isAuthenticated(),
    auth,
  }),
};
</script>

<style scoped lang="sass">
  div
    cursor: pointer
</style>
