<template>
  <ul class="problems-tree">
    <li v-for="cat in categories" v-bind:key="cat.name">
      {{ cat.displayName }}
    </li>
  </ul>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src='./style.sass'></style>
