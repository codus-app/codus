<template>
  <div class="assignment-list-item" v-bind:class="{ expanded }">
    <div class="top" v-on:click="toggle">
      <div class="icon"><icon-clipboard></icon-clipboard></div>
      <div class="info">
        <h2>{{ assignment.name }}</h2>
        <div class="due">
          <icon-calendar></icon-calendar>
          {{ dueDate }}
        </div>
      </div>
      <div class="actions">
        <icon-more v-on:click="$event.stopPropagation()"></icon-more>
        <icon-menu class="reorder" v-if="!expanded" v-on:click="$event.stopPropagation()"></icon-menu>
      </div>
    </div>

    <div class="bottom-content" v-if="expanded">Hey</div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
