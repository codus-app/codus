<template>
  <div class="empty-message">
    <img src="/static/illustrations/empty-clipboard.svg">
    <slot name="title"><h2>There’s nothing here</h2></slot>
    <p><slot></slot></p>
    <div class="action" v-on:click="$emit('action-click')">
      <icon-plus></icon-plus>
      <slot name="cta"><span>Add</span></slot>
    </div>
  </div>
</template>

<style scoped lang="sass" src="./style.sass"></style>
