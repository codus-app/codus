<template>
  <div>
    <carousel-arrow direction="left" v-on:left="moveLeft"></carousel-arrow>
    <carousel-arrow direction="right" v-on:right="moveRight"></carousel-arrow>

    <carousel ref="carousel" v-on:change="updateDotsFromCarousel">
      <challenge-card v-for="i in cardCount" v-bind:key="i">
        <div slot="top">Test</div>
        <div slot="title">Card {{ i }}</div>
        <div slot="bottom">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </div>
      </challenge-card>
    </carousel>

    <carousel-dots
      ref="dots"
      :numDots="cardCount"
      v-on:change="updateCarouselFromDots">
    </carousel-dots>
  </div>
</template>

<script>
export default {
  data: () => ({
    cardCount: 25,
  }),
  methods: {
    moveLeft() {
      this.$refs.carousel.circularMove = true;
      this.$refs.carousel.left();
    },
    moveRight() {
      this.$refs.carousel.circularMove = true;
      this.$refs.carousel.right();
    },

    updateCarouselFromDots() {
      this.$refs.carousel.circularMove = false;
      this.$refs.carousel.centerIndex = this.$refs.dots.selected;
    },
    updateDotsFromCarousel() {
      this.$refs.dots.selected = this.$refs.carousel.centerIndex;
    },
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
