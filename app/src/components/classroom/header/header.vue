<template>
  <div class="classroom-header">
    <h1>{{ classroom.name }}</h1>
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
