<template>
  <tippy
    v-bind:to="targetName"
    v-bind:placement="placement"
    theme="codus-context"
    trigger="click"
    interactive="true"
    arrow="true"
    arrowTransform="scale(0)"
    animation="fade"
  >
    <div
      class="item"
      v-for="(item, i) in items"
      v-bind:key="i"
      v-bind:ref="`item-${i}`"
      v-on:click="items[i].onclick(); close();"
    >
      <component v-bind:is="`icon-${item.icon}`"></component>
      <span class="label" v-html="item.label"></span>
    </div>
  </tippy>
</template>

<script src="./script.js"></script>

<style lang="sass" src="./tippy.sass"></style>
<style scoped lang="sass" src="./style.sass"></style>
