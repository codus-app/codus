<template>
  <transition name="modal-fade">
    <div class="modal-bg" ref="modal-bg" v-bind:style="style" v-on:click.self="$emit('close')">
      <div class="modal-container">
        <div class="modal">
          <slot>Modal!</slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['bgcolor'],
  computed: {
    style() {
      return { backgroundColor: this.bgcolor || 'rgba(0, 0, 0, 0.5)' };
    },
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
