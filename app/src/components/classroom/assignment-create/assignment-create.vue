<template>
  <modal
    v-bind:open="open"
    v-on:close="$emit('close')"
    no-margin
    v-bind:modalStyle="{
      backgroundColor: '#131313',
      padding: '3rem 5rem',
      marginRight: '-12rem',
      // Window width - sidebar width - 3rem minimum margin on both sides
      width: 'calc(100vw - 12rem - (3rem * 2))',
      maxWidth: '38rem',
      height: modalHeight,
      maxHeight: '85vh',
      transition: `${modalBaseTransition}, height .35s`,
    }"
    fade-color="rgba(30, 30, 33, .65)"
  >
    <div class="page-wrapper" ref="pageWrapper">
      <transition v-bind:name="transitionDirection">
        <page-1
          v-if="page === 1"
          v-bind:name.sync="name"
          v-bind:description.sync="description"
          v-on:next="next"
        ></page-1>
      </transition>

      <transition v-bind:name="transitionDirection">
        <page-2
          v-if="page === 2"
          v-bind:selected.sync="selectedProblems"
          v-on:next="next"
        ></page-2>
      </transition>

      <transition v-bind:name="transitionDirection">
        <page-3
          v-if="page === 3"
          v-on:next="next"
        ></page-3>
      </transition>
    </div>

    <transition-fade>
      <div class="back-button" v-if="page > 1" v-on:click="previous">
        <icon-arrow-left></icon-arrow-left>
        Back
      </div>
    </transition-fade>
  </modal>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
