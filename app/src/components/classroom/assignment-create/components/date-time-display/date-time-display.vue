<template>
  <div class="date-time-display">
    <select
      v-model="month"
      v-on:input="
        $event.target.style.width = `calc(${ textWidth(months[$event.target.value]) } + 1.3rem)`;
      "
    >
      <option default hidden disabled value=""></option>
      <option
        v-for="(month, i) in months"
        v-bind:key="month"
        v-bind:value="i"
      >{{ month }}</option>
    </select>

    <input
      type="text"
      v-model="day"
      v-on:keydown="(e) => {
        const v = getUpcomingValue(e);
        if (v.match(/[^0-9]/) || (v.length && v < 1) || v > maxDayForMonth) e.preventDefault();
      }"
      v-on:input="$event.target.style.width = `calc(${textWidth($event.target.value)} + .8rem)`"
    >

    <span class="sep">at</span>

    <input
      type="text"
      v-model="hours"
      v-on:keydown="(e) => {
        const v = getUpcomingValue(e);
        if (v.match(/[^0-9]/) || (v.length && v < 1) || v > 12) e.preventDefault();
      }"
      v-on:input="$event.target.style.width = `calc(${textWidth($event.target.value)} + .8rem)`"
    >
    <span>:</span>
    <input
      type="text"
      v-model="minutes"
      v-on:keydown="(e) => {
        const v = getUpcomingValue(e);
        if (v.match(/[^0-9]/) || v > 59 || v.length > 2) e.preventDefault();
      }"
      v-on:input="$event.target.style.width = `calc(${textWidth($event.target.value)} + .8rem)`"
    >

    <div class="toggle"
      v-on:click="period = ({ 'am': 'pm', 'pm': 'am' })[period]"
    >{{ period }}</div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
