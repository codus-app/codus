<template>
  <div class="category-card" v-bind:class="{ invisible }">
    <!-- This element is out of the flow of the category cards so it can expand without changing
    category card flow -->
    <div class="background" v-bind:class="{ expanded }">

      <div class="collapsed-view" v-bind:class="{ invisible: expanded }">
        <h1>{{ name }}</h1>
        <progress-pie :colors="['#4deb9b', '#1db965']" background="#1e1e21" v-bind:progress="this.completion"></progress-pie>
        <problem-link v-for="p in displayProblems" v-bind="p" v-bind:category="categoryId" v-bind:key="p.name" v-bind:ref="p.name">{{p.name}}</problem-link>
        <div class="remainder" v-if="remainder">+{{remainder}}</div>
      </div>

      <div class="expanded-view" v-bind:class="{ invisible: !expanded }">
        <h1>{{ name }}</h1>
        <problem-link v-for="p in problems" v-bind="p" v-bind:category="categoryId" v-bind:key="p.name"></problem-link>
      </div>

    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src='./style.sass'></style>
