<template>
  <div class="date-time-display">
    <select
      v-bind:value="month"
      v-on:input="setMonth($event.target.value); $nextTick(() => { month = getMonth(); });"
    >
      <option default hidden disabled value=""></option>
      <option value="0">January</option>
      <option value="1">February</option>
      <option value="2">March</option>
      <option value="3">April</option>
      <option value="4">May</option>
      <option value="5">June</option>
      <option value="6">July</option>
      <option value="7">August</option>
      <option value="8">September</option>
      <option value="9">October</option>
      <option value="10">November</option>
      <option value="11">December</option>
    </select>

    <input
      type="text"
      v-model="day"
      v-on:blur="setDay(day); $nextTick(() => { day = getDay(); });"
    >

    <span class="sep">at</span>

    <input
      type="text"
      v-model="hours"
      v-on:blur="setHours(hours); $nextTick(() => { day = getDay(); });"
    >
    <span>:</span>
    <input
      type="text"
      v-model="minutes"
      v-on:blur="setMinutes(minutes); $nextTick(() => { day = getDay(); });"
    >

    <div class="toggle"
      v-on:click="period = ({ 'am': 'pm', 'pm': 'am' })[period]"
    >{{ period }}</div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
