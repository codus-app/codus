<template>
  <div class="classroom-switcher">
    <h2 class="trigger" v-on:click="open = true" v-bind:class="{ 'beg-for-attention': begForAttention }">
      {{ (selectedClassroom || { name: 'Select classroom' }).name }}
    </h2>

    <ul class="dropdown list" v-if="open" v-bind:class="{ 'transition': shouldTransition }">
      <li
        v-for="classroom in sortedClassrooms"
        v-bind:class="{ selected: classroom.code === (selectedClassroom || {}).code }"
        v-bind:key="classroom.code"
      >
        <span
          class="item label"
          v-on:click="switchClassroom(classroom.code); open = false;"
        ><span class="label">{{ classroom.name }}</span></span>
        <icon-x class="remove" v-if="managing" v-on:click="classroomDeleting = classroom"></icon-x>
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

    <modal
      v-bind:open="!!classroomDeleting" v-on:close="classroomDeleting = null"
      v-bind:wide="true"
      v-bind:modalStyle="{ backgroundColor: '#131313', maxWidth: '21.5rem', padding: '1rem 2.5rem 1.25rem' }"
      fade-color="rgba(30, 30, 33, .85)"
    >
      <h1 slot="header">Delete {{ (classroomDeleting || {}).name }}?</h1>

      <ul style="text-align: left; margin-top: .25em; padding-left: 1.25em;">
        <li>Class data will be permanently erased</li>
        <li>All students will be removed from this class</li>
        <li>Individual student accounts and site progress will be preserved</li>
      </ul>

      <template slot="buttons">
          <bold-button type="gray" v-on:click="classroomDeleting = null">Cancel</bold-button>
          <bold-button
            type="red"
            v-on:click="deleteClassroom(classroomDeleting.code).then(() => { classroomDeleting = null })"
          >Delete</bold-button>
        </template>
    </modal>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
