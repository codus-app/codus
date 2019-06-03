<template>
  <div class="editor-page">
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

    <solved-modal
      v-bind:open="solvedModalOpen"
      v-on:close="solvedModalOpen = false"
      v-bind:nextUrl="nextProblem
        ? { ...this.$route, params: { ...this.$route.params, ...this.nextProblem }}
        : ''"
    ></solved-modal>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
