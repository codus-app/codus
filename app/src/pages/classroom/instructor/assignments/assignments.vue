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

    <simplebar>
      <draggable
        class="assignments-list"
        v-model="assignments"
        v-bind:animation="200"
        v-on:start="dragging = true; expandedId = overrideCollapse ? expandedId : null"
        v-on:end="dragging = false; overrideCollapse = false"
      >
        <assignment-list-item
          v-for="assignment in assignments"
          v-bind:key="assignment.id"

          v-bind:assignment="assignment"

          v-bind:expanded="!overrideCollapse && expandedId === assignment.id"
          v-bind:class="{ 'drag-active': dragging }"

          v-on:expand="expandedId = assignment.id"
          v-on:collapse="expandedId = expandedId === assignment.id ? null : expandedId"

          v-on:dragPress="dragPress(assignment.id)"
        ></assignment-list-item>
      </draggable>
    </simplebar>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
