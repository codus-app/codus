<template>
   <div class="save-button" v-bind:class="{ enabled, loading }">
     <div class="button">Save</div>
     <spinner></spinner>
   </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
