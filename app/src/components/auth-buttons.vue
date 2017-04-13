<template>
  <div class="auth-buttons">
    <div v-on:click="$store.commit('toggleSignupModal')" v-if='!$store.state.loggedIn'>Sign Up</div>
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
  .auth-buttons
    height: 1rem
    display: flex
    font-size: .75rem
    align-items: center

    div
      margin-left: 1em
      cursor: pointer
</style>
