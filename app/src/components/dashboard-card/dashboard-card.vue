<template>
  <div class="card">
    <div class="top" v-if="$slots.label || $slots.link">
      <div class="label"><slot name="label"></slot></div>
      <div class="link"><slot name="link"></slot></div>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="sass" src="./style.sass"></style>
