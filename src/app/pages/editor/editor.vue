<template>
  <div class="editor">
    <div class="top-bar">
      <div class="title">
        <span class="montserrat medium">{{ category }} /</span>
        <span class="montserrat extralight">{{ problemName }}</span>
      </div>
    </div>

    <codemirror v-model="code" v-bind:options="cmOptions"></codemirror>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
