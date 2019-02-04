<template>
  <div class="find-replace-card">
    <div class="title">Find + Replace</div>
    <div class="group">
      <input
        type="text"
        placeholder="Find text"
        v-model="query"
      >
      <button v-on:click="find">Find</button>
    </div>
    <div class="group">
      <input
        type="text"
        placeholder="Replace text"
        v-model="replace"
      >
      <button>Replace</button>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
