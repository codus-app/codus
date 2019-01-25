<template>
  <div class="problem-overview-card">
    <h1>{{ problem.name }}</h1>
    <div class="md-description" v-html="problem.description.html"></div>
    <div class="progress" v-bind:style="progressStyle"></div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
