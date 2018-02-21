<template>
  <div class="editor">
    <span class="montserrat medium">{{ category }} /</span>
    <span class="montserrat extralight">{{ problemName }}</span>

    <codemirror v-model="code" v-bind:options="cmOptions"></codemirror>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
