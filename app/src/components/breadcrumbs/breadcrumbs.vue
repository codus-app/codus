<template>
  <div class="breadcrumbs">
    <template v-for="(crumb, i) in crumbs">
      <div class="crumb" v-bind:key="i">{{ crumb }}</div>
      <icon-chevron-right class="separator" v-bind:key="i + 0.5" v-if="i < crumbs.length - 1"></icon-chevron-right>
    </template>
  </div>
</template>

<script>

export default {
  props: { crumbs: Array },
};

</script>

<style scoped lang="sass" src="./style.sass"></style>
