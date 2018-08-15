<template>
  <div class="page" v-bind:class="{ faded: cardsFaded }">
    <div class="scrim" v-on:click="closeAll"></div>
    <div class="cards" v-if="categories.length">
      <category-card
        v-for="id in categories"
        v-bind:key="id"
        v-bind:category-id="id"
        v-on:expanded="cardsFaded = $event"
      ></category-card>
    </div>
    <div class="fade"></div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
