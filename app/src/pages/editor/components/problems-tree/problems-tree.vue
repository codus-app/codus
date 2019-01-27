<template>
  <ul class="problems-tree">
    <li v-for="cat in categories" v-bind:key="cat.name">
      <category-folder v-bind:active="cat.name === $route.params.category">
        <template slot="name">{{ cat.displayName }}</template>

        <li v-for="prob in cat.problems" v-bind:key="prob.name">
          <problem-link
            v-bind:category-name="cat.name"
            v-bind:name="prob.name"
            v-bind:solved="isSolved(cat.name, prob.name)"
            v-bind:solutionBegun="isSolutionBegun(cat.name, prob.name)"
          ></problem-link>
        </li>
      </category-folder>
    </li>
  </ul>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src='./style.sass'></style>
