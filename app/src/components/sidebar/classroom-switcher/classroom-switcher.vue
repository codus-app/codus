<template>
  <div class="classroom-switcher">
    <h2 class="trigger" v-on:click="open = true" v-bind:class="{ 'beg-for-attention': begForAttention }">
      {{ (selectedClassroom || { name: 'Select classroom' }).name }}
    </h2>

    <ul class="dropdown list" v-if="open" v-bind:class="{ 'transition': shouldTransition }">
      <li
        class="item"
        v-for="classroom in sortedClassrooms"
        v-on:click="switchClassroom(classroom.code); open = false;"
        v-bind:class="{ selected: classroom.code === (selectedClassroom || {}).code }"
        v-bind:key="classroom.code"
      >
        <span class="label">{{ classroom.name }}</span>
      </li>

      <li class="item action" v-if="managing" v-on:click="createClassroom">
        <icon-plus></icon-plus>
        <div class="label">Create classroom</div>
      </li>

      <li class="item action" v-on:click="managing = !managing">
        <component
          v-bind:is="managing ? 'icon-x' : 'icon-list'"
          style="transform: scaleX(-1)"
        ></component>
        <span class="label"> {{ managing ? 'Cancel' : 'Manage classes' }} </span>
      </li>
    </ul>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
