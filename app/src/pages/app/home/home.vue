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
    userInfo: JSON.parse(localStorage.getItem('profile')),
    loginCount: 0,
  }),
  computed: {
    firstName() { return this.userInfo.user_metadata.name.split(' ')[0]; },
  },
  created() {
    const man = auth.getManagement();
    man.getUser(this.userInfo.user_id, (err, rsp) => {
      if (err) console.log(err);
      else this.loginCount = rsp.logins_count;
    });
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
