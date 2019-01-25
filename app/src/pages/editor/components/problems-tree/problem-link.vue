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
import { mapGetters } from 'vuex';
export default {
  props: ['category-name', 'name'],
  computed: {
    ...mapGetters(['isSolved', 'isSolutionBegun']),
    solved() { return this.isSolved(this.categoryName, this.name); },
    solutionBegun() { return this.isSolutionBegun(this.categoryName, this.name); },
  },
};
</script>

<style scoped lang="sass" src="./problem-link.sass"></style>
