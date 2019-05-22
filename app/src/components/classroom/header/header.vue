<template>
  <div class="classroom-header">
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

import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('classroom/instructor');

export default {
  computed: {
    ...mapGetters({ classroom: 'selectedClassroom' }),
  },
};

</script>

<style scoped lang="sass" src="./header.sass"></style>
