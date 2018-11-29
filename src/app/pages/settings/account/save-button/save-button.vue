<template>
   <div class="save-button" v-bind:class="{ enabled, loading }" v-on:click="click">
     <div class="button">Save</div>
     <spinner></spinner>
   </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
