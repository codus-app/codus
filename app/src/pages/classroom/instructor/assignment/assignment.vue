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

    <router-view
      v-bind:assignment="assignment"
    ></router-view>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
