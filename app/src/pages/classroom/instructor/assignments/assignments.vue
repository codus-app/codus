<template>
  <div
    class="cards-dashboard classroom page"
    v-bind:class="{ unfetched: !fetched }"
  >
    <classroom-header>
      <template slot="actions">
        <icon-file-plus></icon-file-plus>
        <icon-settings></icon-settings>
      </template>
    </classroom-header>

    <div class="assignments-list">
      <assignment-list-item
        v-for="(assignment, i) in classroom.assignments"
        v-bind:key="assignment.id"
        v-bind:assignment="assignment"
        v-bind:expanded="expandedIndex === i"
        v-on:expand="expandedIndex = i"
        v-on:collapse="expandedIndex = expandedIndex === i ? null : expandedIndex"
      ></assignment-list-item>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
