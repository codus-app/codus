<template>
  <div class="assignment-creation-page page-3">
    <h2>Set a due date</h2>
    <p>Optionally, set a date and/or time at which this assignment is due.</p>

    <datepicker
      ref="datepicker"

      inline
      full-month-name
      maximum-view="day"
      :disabled-dates="{ to: today }"

      v-bind:value="date"
      v-on:input="$emit('update:date', $event)"
      v-bind:language="en"

      v-on:changedMonth="calendarPageChanged"
    >
      <div v-if="mounted" class="replacement-header" slot="beforeCalendarHeader">
        <span class="month-name">
          {{ datepicker.utils.getMonthName(monthDisplayed.getMonth(), en.months) }}
        </span>
        <span class="year-number">{{ monthDisplayed.getFullYear() }}</span>

        <div class="month-nav">
          <icon-chevron-left
            v-bind:class="{ disabled: prevMonthDisabled }"
            v-on:click="prevMonth"
          ></icon-chevron-left>
          <icon-chevron-right
            v-on:click="nextMonth"
          ></icon-chevron-right>
        </div>
      </div>
    </datepicker>

    <proceed-button v-bind:disabled="false" v-on:click="$emit('next')">
      <template slot="label">Finish up</template>
      Post assignment
    </proceed-button>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
