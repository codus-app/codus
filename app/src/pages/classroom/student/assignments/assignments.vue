<template>
  <assignment-list
    v-bind:classroom="classroom"
    v-bind:assignments="assignments"
    v-bind:editable="false"
    v-bind:fetched="fetched"

    v-on:expanded="fetch"
  ></assignment-list>
</template>

<script src="./script.js"></script>
