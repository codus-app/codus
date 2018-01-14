<template>
  <div>
    <binary-background></binary-background>
    <h1>Welcome<span v-if="loginCount > 1"><br>back</span>,<br>{{ firstName }}</h1>
  </div>
</template>

<script>
import auth from '../../../scripts/auth';

export default {
  data: () => ({
    userInfo: JSON.parse(localStorage.getItem('user')),
  }),
  computed: {
    firstName() { return this.userInfo.user_metadata.name.split(' ')[0]; },
    loginCount() { return this.userInfo.logins_count; },
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
