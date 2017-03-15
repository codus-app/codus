<template>
  <div>
    <div v-on:click="$store.commit('toggleLogin')" v-if='!loggedIn'>Log In</div>
    <div v-on:click="auth.logout()" v-if='loggedIn'>Log Out</div>
  </div>
</template>

<script>
import auth from '../../scripts/auth';

export default {
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
