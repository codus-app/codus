<template>
  <editor
    v-bind="{
      fetched,
      code,
      remoteCode,
      saveStatus,

      problem,
      categoryName,

      solved,
      testResults,
      checkInProgress,

      content: {
        categories,
        solved: user.solved,
        solutionsBegun: user.solutionsBegun,
      },
    }"
    v-on:input="onInput"
    v-on:solutionCheck="solutionCheck"
  ></editor>
</template>

<script src="./script.js"></script>
