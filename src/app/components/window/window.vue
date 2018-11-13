<template>
  <div
    class="window"
    v-bind:class="{
      'can-move': canMove && !collapsed,
      'can-resize': canResize && !collapsed,
      'can-collapse': canCollapse,
      collapsed,
    }"
  >
    <div class="top-bar">
      <span class="title">
        <slot name="title">Title</slot>
      </span>
      <component
        v-if="canCollapse"
        v-bind:is="collapsed ? 'icon-maximize' : 'icon-minimize'"
        v-on:click="(collapsed ? expand : collapse)()"
      ></component>
    </div>

    <div class="content-container">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
