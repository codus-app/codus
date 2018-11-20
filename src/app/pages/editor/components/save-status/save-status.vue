<template>
  <div class="save-status">
    <div class="msg">{{ saveMsg }}</div>
    <div class="indicator" v-bind:class="{ green: saving === false, yellow: saving, gray: saving === null }"></div>
  </div>
</template>

<script>
export default {
  props: { saving: Boolean },
  computed: {
    saveMsg() {
      if (this.saving === null) return 'Unsaved';
      return this.saving ? 'Saving' : 'Saved';
    },
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
