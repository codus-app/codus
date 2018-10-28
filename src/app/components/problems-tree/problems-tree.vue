<template>
  <ul class="problems-tree">
    <li v-for="cat in categories" v-bind:key="cat.name">
      <category-folder>
        <template slot="name">{{ cat.displayName }}</template>

        <li v-for="prob in cat.problems" v-bind:key="prob.name">
          <problem-link
            v-bind:category-name="cat.name"
            v-bind:name="prob.name"
          ></problem-link>
        </li>
      </category-folder>
    </li>
  </ul>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src='./style.sass'></style>
