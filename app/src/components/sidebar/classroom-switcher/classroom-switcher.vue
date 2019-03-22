<template>
  <div class="classroom-switcher">
    <h2 class="trigger" v-on:click="open = true" v-bind:class="{ 'beg-for-attention': begForAttention }">
      {{ (selectedClassroom || { name: 'Select classroom' }).name }}
    </h2>

    <ul class="dropdown list" v-if="open">
      <li class="item" v-for="classroom in sortedClassrooms" v-on:click="switchClassroom(classroom.code); open = false;" v-bind:key="classroom.code">
        <span class="label">{{ classroom.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
