<template>
  <svg class="radial-progress" v-bind:class="{ [type]: true }" ref="target">
    <defs>
      <linearGradient id="fillGradient" x1="20%" x2="80%" y1="0%" y2="100%">
        <stop offset="5%" stop-color="#4deb9b"></stop>
        <stop offset="95%" stop-color="#1db965"></stop>
      </linearGradient>
    </defs>
  </svg>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
