<template>
  <transition
    name="staggered-slide"
    v-on:enter="enter"
    v-on:leave="leave"
  >
    <slot></slot>
  </transition>
</template>

<script src="./staggered-slide.js"></script>
