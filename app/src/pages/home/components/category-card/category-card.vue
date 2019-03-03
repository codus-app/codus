<template>
  <div class="category-card" v-bind:class="{ invisible, expanded }">
    <!-- This element is out of the flow of the category cards so it can expand without changing
    category card flow -->
    <div class="background" v-bind:style="positionStyles">

      <div class="collapsed-view" v-bind:class="{ invisible: expanded }">
        <h1 v-on:click="expanded = true">{{ category.displayName }}</h1>
        <radial-progress
          type="pie"
          v-bind:progress="(category.solved.length / category.problems.length) || 0"
        ></radial-progress>

        <problem-link
          v-for="{ name } in displayProblems"
          v-bind:name="name"
          v-bind:passed="category.solved.includes(name)"
          v-bind:category="categoryId"
          v-bind:key="name"
          v-bind:ref="name"
        >{{name}}</problem-link>

        <div class="remainder" v-if="remainder" v-on:click="expanded = true">+{{remainder}}</div>
      </div>

      <div class="expanded-view" v-bind:class="{ invisible: !expanded }">
        <h1>{{ category.displayName }}</h1>
        <radial-progress
          type="pie"
          v-bind:progress="(category.solved.length / category.problems.length) || 0"
        ></radial-progress>
        <div class="md-description" v-html="category.description.html"></div>
        <problem-link
          v-for="{ name } in category.problems"
          v-bind:name="name"
          v-bind:passed="category.solved.includes(name)"
          v-bind:category="categoryId"
          v-bind:key="name"
        >{{name}}</problem-link>
      </div>

    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src='./style.sass'></style>
