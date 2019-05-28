<template>
  <div class="category-folder" v-bind:class="{ expanded }">
    <div class="top" v-on:click="expanded = !expanded" v-bind:class="{ active }">
      <icon-chevron-right></icon-chevron-right>
      <icon-folder v-bind:class="{ complete: allSolved }"></icon-folder>

      <div class="name">
        <slot name="name"></slot>
      </div>
    </div>

    <div
      class="children-container"
      v-bind:style="{
        height: this.childrenHeight,
        transitionDuration: `${this.transitionDuration / 1000}s`,
      }"
    >
      <ul class="children" ref="children">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script src="./category-folder.js"></script>

<style scoped lang="sass" src="./category-folder.sass"></style>
