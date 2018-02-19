<template>
  <div class="category-card" v-bind:class="{ invisible }">
    <h1>{{ name }}</h1>
    <problem-link v-for="p in displayProblems" v-bind:key="p.name" v-bind:problem="p.name" v-bind:completed="p.passed" v-bind:ref="p.name">{{p.name}}</problem-link>
  </div>
</template>

<script src="./script.js"></script>
<style lang="sass" src='./style.sass'></style>
