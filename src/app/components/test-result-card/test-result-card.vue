<template>
    <div class="status-indicator" v-bind:class="{ green: passed, red: passed === false }"></div>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
