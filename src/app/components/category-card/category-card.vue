<template>
  <div class="category-card" v-bind:class="{ invisible }">
    <h1>{{ name }}</h1>
    <progress-pie :colors="['#4deb9b', '#1db965']" background="#1e1e21" v-bind:progress="this.completion"></progress-pie>
    <problem-link v-for="p in displayProblems" v-bind="p" v-bind:category="categoryId" v-bind:key="p.name" v-bind:ref="p.name">{{p.name}}</problem-link>
    <div class="remainder" v-if="remainder">+{{remainder}}</div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src='./style.sass'></style>
