<template>
  <div class="modal-wrapper" v-bind:class="{ open }" ref="root">
    <div
      class="scrim"
      v-bind:style="{ ...scrimStyle, backgroundColor: fadeColor }"
      v-on:click="$emit('close')"
    ></div>

    <div class="modal" v-bind:class="{ wide }" v-bind:style="modalStyle">
      <icon-x v-on:click="$emit('close')"></icon-x>

      <!-- Header -->
      <div class="header">
        <slot name="header"></slot>
      </div>
      <!-- Content -->
      <div class="content" v-bind:style="{ margin: noMargin ? '0' : null }">
        <slot></slot>
      </div>
      <!-- Buttons -->
      <div class="buttons">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
