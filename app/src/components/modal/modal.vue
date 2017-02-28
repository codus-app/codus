<template>
  <div class="modal-bg" v-bind:style="{ backgroundColor: bgcolor || 'rgba(0, 0, 0, 0.5)' }">
    <div class="modal-container">
      <div class="modal">
        <slot>Modal!</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['bgcolor'],
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
