<template>
  <div class="assignment-list-item">
    <div class="icon"><icon-clipboard></icon-clipboard></div>
    <div class="info">
      <h2>{{ assignment.name }}</h2>
      <div class="due">
        <icon-calendar></icon-calendar>
        {{ dueDate }}
      </div>
    </div>
    <div class="actions">
      <icon-more></icon-more>
      <icon-menu class="reorder"></icon-menu>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
