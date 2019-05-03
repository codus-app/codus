<template>
  <div class="assignment-creation-page page-3">
    Page 3!

    <proceed-button v-bind:disabled="false" v-on:click="$emit('next')">
      <template slot="label">Finish up</template>
      Post assignment
    </proceed-button>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
