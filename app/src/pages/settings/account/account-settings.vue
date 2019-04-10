<template>
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

    <template v-if="role === 'student'">
      <div class="card classroom-info" v-if="classroomFetched && classroom">
        <h2>Classroom</h2>
        <div class="classroom" v-on:click="$router.push('/classroom')">
          <div class="picture" v-bind:style="{ backgroundImage: `url(${ classroom.instructor.picture })` }"></div>
          <div class="info">
            <div class="name">{{ classroom.name }}</div>
            <div class="students"> {{ classroom.size }} Students</div>
          </div>
          <bold-button type="red" v-on:click="$event.stopPropagation(); leaveClassroom();">Leave</bold-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
