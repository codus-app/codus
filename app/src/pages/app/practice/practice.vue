<template>
  <div>
    <carousel-arrow direction="left" v-on:left="moveLeft"></carousel-arrow>
    <carousel-arrow direction="right" v-on:right="moveRight"></carousel-arrow>

    <carousel ref="carousel">
      <challenge-card v-for="i in 10">
        <div slot="top">Test</div>
        <div slot="title">Card {{ i }}</div>
        <div slot="bottom">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
      </challenge-card>
    </carousel>
  </div>
</template>

<script>
export default {
  methods: {
    moveLeft() {
      this.$refs.carousel.left();
    },
    moveRight() {
      this.$refs.carousel.right();
    },
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
