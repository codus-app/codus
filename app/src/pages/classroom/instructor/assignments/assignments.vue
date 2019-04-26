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

    <draggable
      class="assignments-list"
      v-model="assignments"
      handle=".reorder"
      v-bind:animation="200"
    >
      <assignment-list-item
        v-for="assignment in assignments"
        v-bind:key="assignment.id"
        v-bind:assignment="assignment"
        v-bind:expanded="expandedId === assignment.id"
        v-on:expand="expandedId = assignment.id"
        v-on:collapse="expandedId = expandedId === assignment.id ? null : expandedId"
      ></assignment-list-item>
    </draggable>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
