<template>
  <transition
    name="expand-y"
    v-on:enter="enter"
    v-on:leave="leave"
  >
    <slot></slot>
  </transition>
</template>

<script src="./expand.js"></script>
