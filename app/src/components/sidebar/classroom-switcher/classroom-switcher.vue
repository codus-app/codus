<template>
  <div class="classroom-switcher">
    <h2 class="trigger" v-on:click="open = true" v-bind:class="{ 'beg-for-attention': begForAttention }">
      {{ (selectedClassroom || { name: 'Select classroom' }).name }}
    </h2>

    <!-- Dropdown -->

    <transition-expand-y v-bind:transition-duration="200">
      <ul class="dropdown list" v-if="open" v-bind:class="{ 'transition': shouldTransition }">
        <li
          v-for="(classroom, i) in sortedClassrooms"
          v-bind:class="{ selected: classroom.code === (selectedClassroom || {}).code }"
          v-bind:key="classroom.code"
        >
          <span
            class="item label"
            v-on:click="switchClassroom(classroom.code); open = false;"
          ><span class="label">{{ classroom.name }}</span></span>
          <transition-staggered-slide v-bind:index="i">
            <icon-x class="remove" v-if="managing" v-on:click="classroomDeleting = classroom"></icon-x>
          </transition-staggered-slide>
        </li>


        <transition-expand-y>
          <li class="item action" v-if="managing" v-on:click="classroomCreation.open = true">
            <icon-plus></icon-plus>
            <div class="label">Create classroom</div>
          </li>
        </transition-expand-y>

        <li class="item action" v-on:click="managing = !managing">
          <component
            v-bind:is="managing ? 'icon-x' : 'icon-list'"
            style="transform: scaleX(-1)"
          ></component>
          <span class="label"> {{ managing ? 'Cancel' : 'Manage classes' }} </span>
        </li>
      </ul>
    </transition-expand-y>

    <!-- "Create Classroom" modal -->
    <modal
      v-bind:open="classroomCreation.open" v-on:close="classroomCreation.open = false"
      v-bind:modalStyle="{ backgroundColor: '#131313', width: '21.5rem', maxWidth: '21.5rem', padding: '1rem 2.5rem 1.25rem' }"
      fade-color="rgba(30, 30, 33, .85)"
      ref="creationModal"
    >
      <h1 slot="header">Create a classroom</h1>

      <text-input v-model="classroomCreation.name" placeholder="Classroom name"></text-input>

      <bold-button
        slot="buttons"
        type="green"
        v-on:click="createClassroom({ name: classroomCreation.name }).then(() => { classroomCreation.name = ''; classroomCreation.open = false; })"
      >Create</bold-button>
    </modal>

    <!-- "Delete Classroom" confirmation modal -->

    <modal
      v-bind:open="!!classroomDeleting" v-on:close="classroomDeleting = null"
      v-bind:wide="true"
      v-bind:modalStyle="{ backgroundColor: '#131313', maxWidth: '21.5rem', padding: '1rem 2.5rem 1.25rem' }"
      fade-color="rgba(30, 30, 33, .85)"
      ref="deletionModal"
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
