<template>
  <div class="date-time-display">
    <select
      v-bind:value="month"
      v-on:input="
        setMonth($event.target.value);
        $nextTick(() => { month = getMonth(); });
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
      v-on:input="$event.target.style.width = `calc(${textWidth($event.target.value)} + .8rem)`"
      v-on:blur="setDay(day); $nextTick(() => { day = getDay(); });"
    >

    <span class="sep">at</span>

    <input
      type="text"
      v-model="hours"
      v-on:input="$event.target.style.width = `calc(${textWidth($event.target.value)} + .8rem)`"
      v-on:blur="setHours(hours); $nextTick(() => { day = getDay(); });"
    >
    <span>:</span>
    <input
      type="text"
      v-model="minutes"
      v-on:input="$event.target.style.width = `calc(${textWidth($event.target.value)} + .8rem)`"
      v-on:blur="setMinutes(minutes); $nextTick(() => { day = getDay(); });"
    >

    <div class="toggle"
      v-on:click="period = ({ 'am': 'pm', 'pm': 'am' })[period]"
    >{{ period }}</div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
