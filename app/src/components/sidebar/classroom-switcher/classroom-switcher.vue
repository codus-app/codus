<template>
  <div class="classroom-switcher">
    <h2
      class="trigger"
      v-on:click="open = true"
      v-bind:class="{ 'beg-for-attention': begForAttention }"
    >
      {{ (selectedClassroom || { name: 'Select classroom' }).name }}
    </h2>

    <!-- Dropdown -->

    <transition-expand axis="y" v-bind:transition-duration="200">
      <ul class="dropdown list" v-if="open" v-bind:class="{ 'transition': shouldTransition }">
        <li
          v-for="(classroom, i) in sortedClassrooms"
          v-bind:class="{ selected: classroom.code === (selectedClassroom || {}).code }"
          v-bind:key="classroom.code"
        >
          <router-link
            class="item label"
            v-bind:to="linkToClassroom(classroom.code)"
          >{{ classroom.name }}</router-link>
          <transition-staggered-slide v-bind:index="i">
            <icon-x
              class="remove"
              v-if="managing"
              v-on:click="classroomDeletion.classroom = classroom; classroomDeletion.open = true"
            ></icon-x>
          </transition-staggered-slide>
        </li>


        <transition-expand axis="y">
          <li class="item action" v-if="managing" v-on:click="classroomCreation.open = true">
            <icon-plus></icon-plus>
            <div class="label">Create classroom</div>
          </li>
        </transition-expand>

        <li class="item action" v-on:click="managing = !managing">
          <component
            v-bind:is="managing ? 'icon-x' : 'icon-list'"
            style="transform: scaleX(-1)"
          ></component>
          <span class="label"> {{ managing ? 'Cancel' : 'Manage classes' }} </span>
        </li>
      </ul>
    </transition-expand>

    <!-- "Create Classroom" modal -->

    <portal to="modal-target">
      <modal
        class="creation-modal" ref="creationModal"
        v-bind:open="classroomCreation.open"
        v-on:close="classroomCreation.open = false"
        v-bind:modalStyle="{ backgroundColor: '#131313', width: '20rem', padding: '1.5rem 3rem' }"
        v-bind:wide="true"
        fade-color="rgba(30, 30, 33, .85)"
      >
        <template v-slot:header>
          <h1 style="margin-bottom: -.5em">Create a classroom</h1>
        </template>

        <text-input
          v-model="classroomCreation.name"
          placeholder="Classroom name"
          :char-limit="20"
        ></text-input>

        <template v-slot:buttons>
          <loading-button
            text="Create"
            v-bind:enabled="classroomCreation.name.length > 0 && classroomCreation.name.length <= 20"
            v-bind:onClick="() => createClassroom({ name: classroomCreation.name })"
            v-on:saved="classroomCreated"
          ></loading-button>
        </template>
      </modal>

      <!-- "Delete Classroom" confirmation modal -->

      <modal
        class="deletion-modal" ref="deletionModal"
        v-bind:open="classroomDeletion.open" v-on:close="classroomDeletion.open = false"
        v-bind:wide="true"
        v-bind:modalStyle="{
          backgroundColor: '#131313',
          width: '20rem',
          padding: '1rem 2.5rem 1.25rem'
        }"
        fade-color="rgba(30, 30, 33, .85)"
      >
        <template v-slot:header>
          <h1>Delete {{ (classroomDeletion.classroom || {}).name }}?</h1>
        </template>

        <ul class="modal-content">
          <li>All class data will be permanently erased</li>
          <li>All students will be removed from this class</li>
          <li>Individual student accounts and site progress will be preserved</li>
        </ul>

        <template v-slot:buttons>
          <bold-button type="gray" v-on:click="classroomDeletion.open = false">Cancel</bold-button>
          <bold-button
            type="red"
            v-on:click="deleteClassroom(classroomDeletion.classroom.code).then(() => {
              classroomDeletion.open = false;
            })"
          >Delete</bold-button>
        </template>
      </modal>
    </portal>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
