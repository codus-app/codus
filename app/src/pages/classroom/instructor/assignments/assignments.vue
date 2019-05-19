<template>
  <div
    class="cards-dashboard classroom page"
    v-bind:class="{ unfetched: !fetched }"
  >
    <classroom-header>
      <template slot="actions">
        <icon-file-plus v-on:click="$emit('create-assignment')"></icon-file-plus>
        <icon-settings></icon-settings>
      </template>
    </classroom-header>

    <simplebar v-if="assignments.length">
      <draggable
        class="assignments-list"
        v-model="assignments"
        v-bind:animation="200"
        handle=".draggable-area"
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

          v-on:delete="assignmentDeletion = { open: true, assignment }"
          v-on:dragPress="dragPress(assignment.id)"
        ></assignment-list-item>
      </draggable>
    </simplebar>
    <empty-message v-else-if="fetched" v-on:action-click="$emit('create-assignment')">
      <h2 slot="title">There’s nothing here</h2>
      To get started, create your first assignment.
      <span slot="cta">Create assignment</span>
    </empty-message>


    <!-- "Delete assignment" confirmation modal -->

    <portal to="modal-target">
      <modal
        class="delete-modal" ref="deleteModal"
        v-bind:open="assignmentDeletion.open" v-on:close="assignmentDeletion.open = false"
        v-bind:wide="true"
        v-bind:modalStyle="{
          backgroundColor: '#131313',
          width: '20rem',
          padding: '1rem 2.5rem 1.25rem'
        }"
        fade-color="rgba(30, 30, 33, .85)"
      >
        <h1 slot="header">Delete {{ (assignmentDeletion.assignment || {}).name }}?</h1>

        This assignment will be permanently erased. Students’ solutions to this assignment’s
        individual problems will be preserved.

        <template slot="buttons">
          <bold-button type="gray" v-on:click="assignmentDeletion.open = false">Cancel</bold-button>
          <bold-button
            type="red"
            v-on:click="deleteAssignment({
              classroom: classroom.code,
              id: assignmentDeletion.assignment.id
            })
              .then(() => { assignmentDeletion.open = false; })"
          >Delete</bold-button>
        </template>
      </modal>
    </portal>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
