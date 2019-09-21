<template>
  <assignment-list
    ref="list"
    v-bind:classroom="classroom"
    v-bind:assignments="classroom.assignments || []"
    v-bind:editable="true"
    v-bind:fetched="classroom.fetched"

    v-on:reorder="reorderAssignments({
      classroom: classroom.code,
      ids: $event.map(assignment => assignment.id),
    })"

    v-on:deleteAssignment="deleteAssignment({
      classroom: classroom.code,
      id: $event,
    })
      .then(() => { $refs.list.$emit('deleted'); })"
  ></assignment-list>
</template>

<script src="./script.js"></script>
