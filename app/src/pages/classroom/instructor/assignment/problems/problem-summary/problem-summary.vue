<template>
  <div class="problem-summary" v-bind:class="{ expanded }">
    <div
      class="top"
      v-on:click="toggle"
    >
      <div class="incorrect"></div>
      <div class="label">{{ problem.name }}</div>
      <div class="correct"></div>
    </div>

    <transition-expand axis="y" v-bind:transition-duration="300">
      <div class="bottom-content" v-if="expanded">
        Inside
      </div>
    </transition-expand>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
