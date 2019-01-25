<template>
  <router-link
    class="problem-link font-1 light"
    v-bind:class="{ solved }"
    v-bind:to="`/problem/${categoryName}/${name}`"
  >
    <component v-bind:is="solved ? 'icon-check' : 'icon-file'"></component>
    <span>{{name}}</span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['category-name', 'name'],
  computed: {
    ...mapGetters(['isSolved']),
    solved() { return this.isSolved(this.categoryName, this.name); }
  },
};
</script>

<style scoped lang="sass" src="./problem-link.sass"></style>
