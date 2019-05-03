<template>
  <div class="assignment-creation-page page-2">
    Page 2!

    <proceed-button v-bind:disabled="false" v-on:click="$emit('next')">
      <template slot="label">Next step</template>
      Final details
    </proceed-button>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
