<template>
  <div class="page"
    v-bind:class="{ faded: cardsFaded }"
    v-on:scroll="onScroll"
  >
    <div class="scrim" v-on:click="closeAll"></div>
    <div class="cards" v-if="categories.length">
      <category-card
        v-for="id in categories"
        v-bind:key="id"
        v-bind:category-id="id"
        v-bind:scroll="scrollPos"
        v-bind:bounds="cardBounds"
        v-on:expanded="cardsFaded = $event"
      ></category-card>
    </div>
    <div class="fade"></div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
