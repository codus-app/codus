<template>
  <div class="page">
    <div class="cards">
      <category-card v-for="id in categories" v-bind:key="id" v-bind:category-id="id"></category-card>
    </div>
    <div class="fade"></div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
