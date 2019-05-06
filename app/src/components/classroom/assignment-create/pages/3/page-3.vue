<template>
  <div class="assignment-creation-page page-3">
    <datepicker
      inline
      v-bind:value="date"
      v-on:input="$emit('update:date', $event)"
      maximum-view="day"
    ></datepicker>

    <proceed-button v-bind:disabled="false" v-on:click="$emit('next')">
      <template slot="label">Finish up</template>
      Post assignment
    </proceed-button>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
