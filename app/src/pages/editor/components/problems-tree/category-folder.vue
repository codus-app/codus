<template>
  <div class="category-folder" v-bind:class="{ expanded }">
    <div class="top" v-on:click="expanded = !expanded" v-bind:class="{ active }">
      <icon-chevron-right></icon-chevron-right>
      <icon-folder></icon-folder>

      <div class="name font-1 light">
        <slot name="name"></slot>
      </div>
    </div>

    <div class="children-container" v-bind:style="{ height: this.childrenHeight, transitionDuration }">
      <ul class="children" ref="children">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script src="./category-folder.js"></script>

<style scoped lang="sass" src="./category-folder.sass"></style>
