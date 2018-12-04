<template>
  <div class="save-status">
    <div class="msg">{{ status }}</div>
    <div class="indicator" v-bind:class="{ [status]: true }"></div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      validator: value => ['unsaved', 'saving', 'saved'].includes(value),
      default: 'saved',
    },
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
