<template>
  <router-link
    class="sb-link" v-bind:class="{ collapsed, disabled, 'loose-match': meta.looseMatch }"
    v-bind:to="replaceParams(path)"
    v-bind:title="meta.label"
    v-tippy="{
      placement: 'right',
      distance: '15',
      arrowTransform: 'scale(.85)',
      trigger: 'manual',
    }"
    v-on:mouseenter.native="() => { if (collapsed && $el._tippy) $el._tippy.show(); }"
    v-on:mouseleave.native="() => { if ($el._tippy) $el._tippy.hide(); }"
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

  props: ['path', 'meta', 'collapsed', 'disabled', 'replaceParams'],

  watch: {
    collapsed() { if (!this.collapsed && this.$el._tippy) this.$el._tippy.hide(); },
  },

};
</script>

<style scoped lang="sass" src="./sidebar-link.sass"></style>
