<template>
  <tippy
    v-bind:to="targetName"

    trigger="click"
    v-bind:placement="placement"
    v-bind:theme="theme || 'codus-context'"
    interactive="true"

    @show="show"
    @hide="hide"

    arrow="true"
    arrowTransform="scale(0)"
    :distance="15"
    animation="none"
    :watchProps="true"
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
