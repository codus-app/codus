<template>
  <div class="editor-page">
    <editor
      ref="editor"
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
    >
      <template v-if="solved && !nextProblem">
        <h2>Congratulations!</h2>
        <p>
          You've solved all the problems! We're always writing new problems, so be sure to check
          back later.
        </p>
        <router-link class="onward" to="/">Go home</router-link>
      </template>
    </solved-modal>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
