<template>
  <div class="assignment-page problems-page">
    <problem-summary
      v-for="problem in assignment.problems"
      v-bind:key="problem.name"
      v-bind:problem="problem"
      v-bind:total-students="classroom.students.length"

      v-bind:expanded="expandedProblem === problem.name"
      v-on:expand="expandedProblem = problem.name"
      v-on:collapse="expandedProblem = expandedProblem === problem.name ? null : expandedProblem"
    ></problem-summary>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
