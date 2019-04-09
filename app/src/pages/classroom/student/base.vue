<template>
  <div class="classroom-route student-route" v-if="classroom">
    <router-view v-bind="{ classroom }"></router-view>
  </div>
  <!-- TODO: replace with CTA for students to join a classroom -->
  <not-found v-else-if="classroomFetched"></not-found>
</template>

<script src="./script.js"></script>
