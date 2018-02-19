<template>
  <div class="page">
    <category-card v-for="id in categories" v-bind:key="id" v-bind:category-id="id"></category-card>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass">
.page
  padding: 1.2rem
</style>
