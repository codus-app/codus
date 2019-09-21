<template>
  <div class="cards-dashboard classroom page" v-if="assignment !== null">
    <classroom-header v-bind:classroom="classroom">
      <template v-slot:subtitle>
        <input
          ref="headerInput"
          type="text"
          v-model="name"
          placeholder="Name this assignment"
          v-on:blur="save"
          v-on:input="updateHeaderInputWidth"
        >
        <span
          class="cta"
          v-on:click="$refs.headerInput.focus();"
        >Change</span>
      </template>
      <template v-slot:actions>
        <div class="due-date">
          <icon-calendar></icon-calendar>
          {{ new Date(assignment.createdAt).toLocaleDateString('default', dateFormat) }}
        </div>
      </template>
    </classroom-header>

    <textarea
      class="description"
      ref="descriptionArea"
      v-model="description"
      placeholder="Add a description"
      v-on:blur="save"
      v-on:input="updateDescriptionHeight"
    ></textarea>

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

  <not-found v-else-if="classroomFetched"></not-found>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
