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
    }"
    fade-color="rgba(30, 30, 33, .65)"
  >
    <page-1
      v-if="page === 1"
      v-bind:name.sync="name"
      v-bind:description.sync="description"
      v-on:validationchange="pageValidation[1] = $event"
    ></page-1>

    <page-2 v-else-if="page === 2"></page-2>

    <page-3 v-else-if="page === 3"></page-3>

    <proceed-button v-bind:disabled="!pageValidation[page]" v-on:click="next">
      <span slot="label">{{ page &lt; 3 ? 'Next step' : 'Finish up' }}</span>
      {{ ['Add problems', 'Finish up', 'Post assignment'][page - 1] }}
    </proceed-button>

    <div class="back-button" v-if="page > 1" v-on:click="page -= 1">
      <icon-arrow-left></icon-arrow-left>
      Back
    </div>
  </modal>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
