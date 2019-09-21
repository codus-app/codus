<template>
  <div class="classroom-header" v-if="classroom">
    <h1 v-bind:class="{ 'has-subtitle': $slots.subtitle }">
      <router-link v-bind:to="{ name: 'classroom-overview', params: $route.params }">
        {{ classroom.name }}
      </router-link>
    </h1>
    <h2 v-if="$slots.subtitle"><slot name="subtitle"></slot></h2>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    classroom: { type: Object, required: true }
  },
};

</script>

<style scoped lang="sass" src="./header.sass"></style>
