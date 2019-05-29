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
      breadcrumbs: classroom.fetched ? [studentName, categoryName, problemName] : undefined,
    }"
    v-on:solutionCheck="solutionCheck"
  >
    <template
      v-if="classroom.fetched"
      v-slot:tree-header
    >{{ studentName.split(/\s/)[0] }}'s Solutions</template>
  </editor>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
