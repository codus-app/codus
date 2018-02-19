<template>
  <div class="category-card">
    <h1>{{ name }}</h1>
    <problem-link v-for="prob in problems" v-bind:problem="prob.name" v-bind:completed="prob.passed">{{prob.name}}</problem-link>
  </div>
</template>

<script src="./script.js"></script>
<style lang="sass" src='./style.sass'></style>
