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
        <div class="half incorrrect-solutions">
          <profile-chip
            v-for="username in problem.studentSolutions.correct"
            v-bind:key="username"
            v-bind="getUser(username)"
          ></profile-chip>
        </div>
        <div class="half correct-solutions">
          <profile-chip
            v-for="username in problem.studentSolutions.incorrect"
            v-bind:key="username"
            v-bind="getUser(username)"
          ></profile-chip>
        </div>
      </div>
    </transition-expand>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
