<template>
  <div class="problem-overview-card">
    <h1 class="font-1 medium">{{ problem.name }}</h1>
    <div class="description" v-html="problem.description.html"></div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
