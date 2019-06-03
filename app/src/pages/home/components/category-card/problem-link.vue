<template>
  <router-link v-bind:to="location" class="problem-link" v-bind:class="{passed}">{{ name }}</router-link>
</template>

<script src="./problem-link.js"></script>
