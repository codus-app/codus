<template>
  <router-link
    class="sb-link" v-bind:class="{ collapsed }"
    v-bind:to="replaceParams(path)"
    v-bind:title="collapsed ? meta.label : ''"
  >
    <!-- Selection indicator (highlights active route) -->
    <div class="indicator" v-if="!collapsed"></div>
    <!-- Icon -->
    <component v-bind:is="`icon-${meta.icon}`"></component>
    <!-- Label -->
    <span v-if="!collapsed">{{meta.label}}</span>
  </router-link>
</template>

<script>
export default {

  props: ['path', 'meta', 'collapsed', 'replaceParams'],

};
</script>

<style scoped lang="sass" src="./sidebar-link.sass"></style>
