<template>
  <div class="modal-bg"
       :style="{ backgroundColor: bgcolor || 'rgba(0, 0, 0, 0.5)' }"
       @click="bgClickClose"
       ref="modal-bg">
    <div class="modal-container">
      <div class="modal">
        <slot>Modal!</slot>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
