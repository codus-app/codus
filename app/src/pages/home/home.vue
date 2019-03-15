<template>
  <div class="page"
    v-bind:class="{ faded: cardsFaded }"
  >

    <simplebar class="cards-scroll" ref="cards-scroll">
      <div class="scrim" v-on:click="closeAll"></div>
      <div class="cards" ref="cards-container">
        <category-card
          v-for="id in categoryIds"
          v-bind:key="id"
          ref="cards"
          v-bind:category-id="id"
          v-bind:scroll="scrollPos"
          v-bind:bounds="cardBounds"
          v-on:expanded="cardsFaded = $event"
        ></category-card>
      </div>
    </simplebar>

    <div class="fade"></div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
