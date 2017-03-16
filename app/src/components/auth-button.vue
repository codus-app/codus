<template>
  <div>
    <div v-on:click="$store.commit('toggleLoginModal')" v-if='!$store.state.loggedIn'>Log In</div>
    <div v-on:click="auth.logout()" v-if='$store.state.loggedIn'>Log Out</div>
  </div>
</template>

<script>
import auth from '../scripts/auth';

export default {
  data: () => ({
    auth,
  }),
};
</script>

<style scoped lang="sass">
  div
    cursor: pointer
</style>
