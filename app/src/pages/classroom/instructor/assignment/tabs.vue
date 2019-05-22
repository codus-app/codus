<template>
  <div class="tab-switcher">
    <router-link
      class="tab"
      v-for="({ name, link }) in tabs"
      v-bind:key="name"
      v-bind:to="link"
      v-bind:class="{ selected: selected === name }"
    >
      {{ name }}
    </router-link>
    <div class="indicator"></div>
  </div>
</template>

<script>
export default {
  props: ['tabs', 'selected'],
};
</script>

<style scoped lang="sass" src="./tabs.sass"></style>
