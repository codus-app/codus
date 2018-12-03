<!-- A component that can display a "pie-style" circular progress indicator with a gradient fill -->
<template>
  <div class="progress-pie" v-bind:style="{ background: progress === 1 ? gradient : background }">
    <div class="left">
      <div class="fill" ref="leftFill"></div>
    </div>
    <div class="right">
      <div class="fill" ref="rightFill"></div>
    </div>
    <icon-check v-if="progress === 1"></icon-check>
  </div>
</template>

<script src='./script.js'></script>
<style scoped lang="sass" src='./style.sass'></style>
