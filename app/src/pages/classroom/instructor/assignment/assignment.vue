<template>
  <div class="cards-dashboard classroom page" v-if="assignment !== null || !classroomFetched">
    <classroom-header v-if="classroomFetched">
      <template v-slot:subtitle>{{ assignment.name }}</template>
      <template v-slot:actions>
        <div class="due-date">
          <icon-calendar></icon-calendar>
          {{ new Date(assignment.createdAt).toLocaleDateString('default', dateFormat) }}
        </div>
      </template>
    </classroom-header>

    <simplebar class="assignment-content">
      <div class="problems-list" v-if="assignmentFetched">
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
    </simplebar>
  </div>

  <not-found v-else></not-found>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
