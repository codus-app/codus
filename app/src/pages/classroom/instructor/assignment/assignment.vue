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

    <tab-switcher
      v-if="classroomFetched"
      v-bind:tabs="[
        { name: 'assignment', link: { name: 'classroom-assignment-info', params } },
        { name: 'problems', link: { name: 'classroom-assignment-problems', params } },
        // { name: 'students', link: { name: 'classroom-assignment-students', params } },
      ]"
      v-bind:selected="$route.meta.tabId"
    ></tab-switcher>

    <simplebar class="tab-page">
      <router-view
        v-if="assignmentFetched"
        v-bind="{ classroom, assignment }"
      ></router-view>
    </simplebar>
  </div>

  <not-found v-else></not-found>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
