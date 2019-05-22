<template>
  <div class="assignment-page problems-page">
    <problem-summary
      v-for="problem in assignment.problems"
      v-bind:key="problem.name"
      v-bind:problem="problem"
    ></problem-summary>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
