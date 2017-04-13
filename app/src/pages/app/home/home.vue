<template>
  <div>
    <binary-background></binary-background>
    <h1>Welcome<br>back,<br>{{ firstName }}</h1>
  </div>
</template>

<script>
export default {
  data: () => ({
    userInfo: JSON.parse(localStorage.getItem('profile')),
  }),
  computed: {
    firstName() { return this.userInfo.user_metadata.name.split(' ')[0]; },
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
