<template>
  <div class="assignment-creation-page page-3">
    <h2>Set a due date</h2>
    <p>Optionally, set a date and/or time at which this assignment is due.</p>

    <datepicker
      inline
      full-month-name
      maximum-view="day"
      :disabled-dates="{ to: today }"

      v-bind:value="date"
      v-on:input="$emit('update:date', $event)"
      v-bind:language="en"
    ></datepicker>

    <proceed-button v-bind:disabled="false" v-on:click="$emit('next')">
      <template slot="label">Finish up</template>
      Post assignment
    </proceed-button>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
