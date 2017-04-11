<template>
  <div>
    <carousel>
      <challenge-card v-for="i in 10">
        <div slot="top">Test</div>
        <div slot="title">Card {{ i }}</div>
        <div slot="bottom">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
      </challenge-card>
    </carousel>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="sass" src="./style.sass"></style>
