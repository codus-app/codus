<template>
  <editor
    v-if="studentSolution !== null && student !== null"
    read-only
    v-bind="{
      fetched: !!fetched,
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
      breadcrumbs: classroom.fetched ? [student.name, categoryName, problemName] : undefined,
    }"
    v-on:solutionCheck="solutionCheck"
  >
    <template
      v-if="classroom.fetched"
      v-slot:tree-header
    >{{ student.name.split(/\s/)[0] }}'s Solutions</template>
  </editor>
  <not-found v-else-if="fetched === 'failed' || (classroom.fetched && student === null)"></not-found>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
