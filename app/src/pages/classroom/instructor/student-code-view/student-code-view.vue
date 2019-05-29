<template>
  <editor
    v-if="contentFetched"
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

      content: {
        categories: solutionCategories,
        solved: solvedProblems,
        solutionsBegun,
      },
    }"
    v-on:solutionCheck="solutionCheck"
  >
  </editor>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
