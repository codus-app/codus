<template>
  <router-link
    class="problem-link font-1 light"
    v-bind:to="`/problem/${categoryName}/${name}`"
  >
    <icon-file></icon-file>
    <span>{{name}}</span>
  </router-link>
</template>

<script>
export default {
  props: ['category-name', 'name'],
};
</script>

<style scoped lang="sass" src="./problem-link.sass"></style>
