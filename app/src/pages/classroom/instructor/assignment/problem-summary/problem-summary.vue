<template>
  <div class="problem-summary" v-bind:class="{ expanded }">
    <div
      class="top"
      v-bind:class="{ empty: !correct.length && !incorrect.length }"
      v-on:click="toggle"
    >
      <div class="bar-wrapper incorrect">
        <div
          class="bar incorrect"
          v-bind:style="{
            width: `${incorrect.length / totalStudents * 100}%`,
            backgroundSize: `${Math.min(totalStudents / incorrect.length, 50) * 100}% 5px`,
          }"
        ></div>
      </div>

      <div class="label">{{ problem.name }}</div>

      <div class="bar-wrapper correct">
        <div
          class="bar correct"
          v-bind:style="{
            width: `${correct.length / totalStudents * 100}%`,
            backgroundSize: `${Math.min(totalStudents / correct.length, 50) * 100}% 5px`,
          }"
        ></div>
      </div>
    </div>



    <transition-expand axis="y" v-bind:transition-duration="300">
      <div class="bottom-content" v-if="expanded">
        <div class="half incorrrect-solutions">
          <h4>
            {{ incorrect.length || 'No' }} incorrect solution<!--
         --><template v-if="incorrect.length !== 1">s</template>
          </h4>
          <profile-chip
            v-for="username in incorrect"
            v-bind:key="username"
            v-bind:link="{
              name: 'student-code-view',
              params: {
                ...$route.params,
                username,
                category: problem.category.name,
                name: problem.name,
              },
            }"
            v-bind="getUser(username)"
          ></profile-chip>
        </div>

        <div class="half correct-solutions">
          <h4>
            {{ correct.length || 'No' }} correct solution<!--
         --><template v-if="correct.length !== 1">s</template>
          </h4>
          <profile-chip
            v-for="username in correct"
            v-bind:key="username"
            v-bind:link="{
              name: 'student-code-view',
              params: {
                ...$route.params,
                username,
                category: problem.category.name,
                name: problem.name,
              },
            }"
            v-bind="getUser(username)"
          ></profile-chip>
        </div>

        <div class="separator"></div>
      </div>
    </transition-expand>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
