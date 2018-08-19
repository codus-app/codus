<template>
  <transition name="modal-fade" v-if="shown">
    <div class="modal-bg" v-bind:style="style" v-on:click.self="close">
      <div class="modal-container">
        <div class="modal">
          <slot>Modal!</slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
