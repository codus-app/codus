<template>
  <div class="save-status">
    <div class="msg">{{ saving ? 'Saving' : 'Saved' }}</div>
    <div class="indicator" v-bind:class="{ green: !saving, yellow: saving }"></div>
  </div>
</template>

<script>
export default {
  props: { saving: Boolean },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
