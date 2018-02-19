<template>
  <div class="category-card">
    <h1>{{ name }}</h1>
    <problem-link v-for="p in problems" v-bind:key="p.name" v-bind:problem="p.name" v-bind:completed="p.passed">{{p.name}}</problem-link>
  </div>
</template>

<script src="./script.js"></script>
<style lang="sass" src='./style.sass'></style>
