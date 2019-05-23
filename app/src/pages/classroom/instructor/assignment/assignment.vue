<template>
  <div class="cards-dashboard classroom page">
    <classroom-header v-if="classroomFetched">
      <template slot="subtitle">{{ assignment.name }}</template>
      <template slot="actions">
        <div class="due-date">
          <icon-calendar></icon-calendar>
          {{ new Date(assignment.createdAt).toLocaleDateString('default', dateFormat) }}
        </div>
      </template>
    </classroom-header>

    <tab-switcher
      v-if="classroomFetched"
      v-bind:tabs="[
        { name: 'details', link: { name: 'classroom-assignment-details', params } },
        { name: 'problems', link: { name: 'classroom-assignment-problems', params } },
        { name: 'students', link: { name: 'classroom-assignment-students', params } },
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
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
