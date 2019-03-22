<template>
  <div class="classroom-switcher">
    <h2 class="trigger">
      {{ (selectedClassroom || { name: 'Select classroom' }).name }}
    </h2>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
