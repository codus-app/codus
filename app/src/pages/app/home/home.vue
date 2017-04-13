<template>
  <div>
    <binary-background></binary-background>
    <h1>Welcome<br>back,<br>{{ profile.nickname }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    profile: () => JSON.parse(localStorage.getItem('profile') || '{}'),
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
