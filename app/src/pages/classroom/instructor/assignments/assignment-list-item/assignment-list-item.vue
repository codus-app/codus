<template>
  <div class="assignment-list-item" v-bind:class="{ expanded }">
    <div
      class="top"
      v-on:click="() => { if (!holding) toggle(); else holding = false; }"
      v-on:mousedown="holdTimeout = setTimeout(() => { $emit('dragPress'); holding = true; }, 200);"
      v-on:mouseup="clearTimeout(holdTimeout)"
      v-on:contextmenu="$event.preventDefault()"
    >
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
        <icon-menu
          class="reorder"
          v-on:mousedown="$emit('dragPress'); $event.stopPropagation();"
          v-on:click="$event.stopPropagation()"
          v-on:contextmenu="$event.preventDefault()"
        ></icon-menu>
      </div>
    </div>

    <transition-expand axis="y" v-bind:transition-duration="300">
      <div class="bottom-content" v-if="expanded">{{ assignment.description }}</div>
    </transition-expand>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
