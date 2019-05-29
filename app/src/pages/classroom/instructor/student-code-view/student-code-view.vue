<template>
  <editor
    read-only
    v-bind="{
      fetched,
      code,
      remoteCode: code,

      problem,
      categoryName,

      solved,
      testResults,
      checkInProgress,
    }"
    v-on:solutionCheck="solutionCheck"
  >
  </editor>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
