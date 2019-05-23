<template>
  <div class="assignment-creation-page page-3">
    <h2>Set a due date</h2>
    <p>Optionally, set a date and/or time at which this assignment is due.</p>

    <label class="checkbox">
      <input type="checkbox" v-model="addDueDate">
      <div class="checkbox">
        <icon-check></icon-check>
      </div>
      <span>Add a due date</span>
    </label>

    <date-time-display
      v-model="selectedDate"
      v-bind:class="{ disabled: !addDueDate }"
    ></date-time-display>

    <proceed-button v-bind:disabled="addDueDate && !dateValid" v-on:click="$emit('next')">
      <template v-slot:label>Finish up</template>
      Post assignment
    </proceed-button>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
