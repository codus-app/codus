<template>
  <div class="breadcrumbs">
    <template v-for="(crumb, i) in crumbs">
      <div class="crumb" v-bind:key="i">{{ crumb }}</div>
      <div class="separator" v-bind:key="i" v-if="i < crumbs.length - 1"></div>
    </template>
  </div>
</template>

<script>

export default {
  props: { crumbs: Array },
};

</script>

<style scoped lang="sass" src="./style.sass"></style>
