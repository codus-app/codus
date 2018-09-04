<template>
  <div class="category-card" v-bind:class="{ invisible, expanded }">
    <!-- This element is out of the flow of the category cards so it can expand without changing
    category card flow -->
    <div class="background" v-bind:style="positionStyles">

      <div class="collapsed-view" v-bind:class="{ invisible: expanded }">
        <h1 v-on:click="expanded = true">{{ category.readableName }}</h1>
        <progress-pie :colors="['#4deb9b', '#1db965']" background="#1e1e21" v-bind:progress="category.solved.length / category.problems.length"></progress-pie>

        <problem-link
          v-for="p in displayProblems"
          v-bind:name="p"
          v-bind:passed="category.solved.includes(p)"
          v-bind:category="categoryId"
          v-bind:key="p"
          v-bind:ref="p"
        >{{p}}</problem-link>

        <div class="remainder" v-if="remainder" v-on:click="expanded = true">+{{remainder}}</div>
      </div>

      <div class="expanded-view" v-bind:class="{ invisible: !expanded }">
        <h1>{{ category.readableName }}</h1>
        <progress-pie :colors="['#4deb9b', '#1db965']" background="#1e1e21" v-bind:progress="category.solved.length / category.problems.length"></progress-pie>
        <div class="description font-2 regular">
          {{ category.description }}
        </div>
        <problem-link
          v-for="p in category.problems"
          v-bind:name="p"
          v-bind:passed="category.solved.includes(p)"
          v-bind:category="categoryId"
          v-bind:key="p"
        >{{p}}</problem-link>
      </div>

    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src='./style.sass'></style>
