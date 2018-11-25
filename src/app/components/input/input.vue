<template>
  <div class="input" v-bind:class="{ [status]: true }">
    <label v-bind:for="_uid" class="title">{{ title }}</label>
    <div>
      <input
        type="text"
        v-bind:id="_uid"
        v-bind:placeholder="placeholder"
        v-bind:value="value"
        v-on:input="onInput"
      >
    </div>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
