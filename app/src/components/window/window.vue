<template>
  <div
    class="window"
    v-bind:class="{
      'can-move': canMove && !collapsed,
      'can-resize': canResize && !collapsed,
      'can-collapse': canCollapse,
      collapsed,
      'dragging': mouseAction !== null,
    }"
    v-bind:style="{ transform }"
  >
    <div
      class="top-bar" ref="top-bar"
      v-on:mousedown="topBarClick"
    >
      <span class="title">
        <slot name="title">Title</slot>
      </span>
      <component
        v-if="canCollapse"
        v-bind:is="collapsed ? 'icon-maximize-2' : 'icon-minimize-2'"
        v-on:click="(collapsed ? expand : collapse)()"
      ></component>
    </div>

    <div class="content-container">
      <simplebar class="content-scroll" ref="content-scroll">
        <div class="content">
          <slot></slot>
        </div>
      </simplebar>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
