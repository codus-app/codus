<template>
  <router-link
    class="problem-link"
    v-bind:class="{ solved }"
    v-bind:to="`/problem/${categoryName}/${name}`"
  >
    <component v-bind:is="solved ? 'icon-check' : (solutionBegun ? 'icon-file-text' : 'icon-file')"></component>
    <span>{{name}}</span>
  </router-link>
</template>

<script>
export default {
  props: ['category-name', 'name', 'solved', 'solutionBegun'],
};
</script>

<style scoped lang="sass" src="./problem-link.sass"></style>
