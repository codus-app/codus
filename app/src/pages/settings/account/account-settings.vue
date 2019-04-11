<template>
  <simplebar>
    <div class="account-settings" v-if="Object.keys(profile).length">
      <div class="card profile">
        <h2>Your profile</h2>

        <profile-picture-upload
          v-bind:url="profile.picture"
          v-on:file="newImage = $event"
          v-bind:serverError="pictureStatus === 'failure' ? pictureMessage : null"
          v-on:clearError="pictureStatus = 'neutral'; pictureMessage = '';"
        ></profile-picture-upload>

        <div class="group">
          <text-input
            title="Username"
            v-model="username"
            placeholder="Username"
            v-bind:status="usernameStatus"
            v-bind:message="usernameMessage"
          ></text-input>

          <text-input
            title="Display Name"
            v-model="name"
            placeholder="Name"
            v-bind:status="nameStatus"
            v-bind:message="nameMessage"
          ></text-input>
        </div>
      </div>

      <div class="card account">
        <h2>Your account</h2>
        <div class="group">
          <text-input
            title="Email"
            v-model="email"
            placeholder="Email address"
            v-bind:status="emailStatus"
            v-bind:message="emailMessage"
          ></text-input>
          <password-reset v-bind:email="email"></password-reset>
        </div>
      </div>

      <loading-button
        v-bind:onClick="save"
        v-bind:enabled="canSave"
        v-bind:text="changed ? 'Save' : 'Saved'"
        v-on:saved="saved"
        v-on:error="errored"
      ></loading-button>

      <template v-if="role === 'student' && classroomFetched">
        <div class="card classroom-join" v-if="classroom === null">
          <h2>Join a class</h2>
          <action-input
            v-model="codeToJoin"
            placeholder="Classroom invite code"
            v-bind:on-click="() => join(codeToJoin)"
          ></action-input>
        </div>

        <div class="card classroom-info" v-else>
          <h2>Classroom</h2>
          <div class="classroom" v-on:click="$router.push('/classroom')">
            <div class="picture" v-bind:style="{ backgroundImage: `url(${ classroom.instructor.picture })` }"></div>
            <div class="info">
              <div class="name">{{ classroom.name }}</div>
              <div class="students"> {{ classroom.size }} Students</div>
            </div>
            <bold-button type="red" v-on:click="$event.stopPropagation(); leaveModalOpen = true;">Leave</bold-button>
          </div>
        </div>

        <!-- "Leave classroom" confirmation modal -->

        <modal
          class="leave-modal" ref="leaveModal"
          v-bind:open="leaveModalOpen" v-on:close="leaveModalOpen = false"
          v-bind:wide="true"
          v-bind:modalStyle="{
            backgroundColor: '#131313',
            width: '22rem',
            padding: '1rem 3rem 1.25rem'
          }"
          fade-color="rgba(30, 30, 33, .85)"
        >
          <h1 slot="header">Leave {{ (classroom || {}).name }}?</h1>
          You’ll completely lose access to {{ (classroom || {}).name }}. You can rejoin
          {{ (classroom || {}).name }} later with the classroom code, but some of your classroom data
          may be permanently erased.

          <template slot="buttons">
            <bold-button type="gray" v-on:click="leaveModalOpen = false">Cancel</bold-button>
            <bold-button
              type="red"
              v-on:click="leaveClassroom().then(() => { leaveModalOpen = false; })"
            >Leave</bold-button>
          </template>
        </modal>

      </template>
    </div>
  </simplebar>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
