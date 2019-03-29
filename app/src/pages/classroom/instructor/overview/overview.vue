<template>
  <div
    class="cards-dashboard classroom page"
    v-if="classroom !== null"
    v-bind:class="{ unfetched: !fetched }"
  >
    <classroom-header>
      <template slot="actions">
        <icon-user-plus v-on:click="invitationOpen = true"></icon-user-plus>
        <icon-settings></icon-settings>
      </template>
    </classroom-header>

    <div class="row">
      <dashboard-card class="students">
        <template slot="label">
          {{ students.length || '' }} Student<span v-if="students.length !== 1">s</span>
        </template>
        <router-link
          slot="link"
          v-bind:to="{ name: 'classroom-students', params: $route.params }"
          v-if="students.length"
        >View all</router-link>
        <div class="students-list" v-if="students.length">
          <router-link
            class="student"
            v-for="student in students.slice(0, 8)"
            v-bind:key="student.username"
            v-bind:to="`/user/${student.username}`"
          >
            <div
              class="image"
              v-bind:style="{ 'background-image': `url(${student.picture})` }"
            ></div>
            <div class="name">{{ student.name }}</div>
          </router-link>
        </div>
        <div class="empty" v-else>
          <h3>There’s nobody here</h3>
          <div class="cta" v-on:click="invitationOpen = true">
            <icon-plus></icon-plus> Invite students
          </div>
        </div>
      </dashboard-card>

      <dashboard-card class="assignments">
        <template slot="label">
          {{ assignments.length || '' }} Assignment<span v-if="assignments.length !== 1">s</span>
        </template>
        <router-link
          slot="link"
          v-bind:to="{ name: 'classroom-assignments', params: $route.params }"
          v-if="assignments.length"
        >View all</router-link>
        <div class="assignments-list" v-if="assignments.length"></div>
        <div class="empty" v-else>
          <h3>No assignments found</h3>
          <div class="cta"> <icon-plus></icon-plus> Create assignment </div>
        </div>
      </dashboard-card>
    </div>

    <classroom-invitation-modal
      v-bind:open="invitationOpen"
      v-on:close="invitationOpen = false"
      v-bind:classroom="classroom"
    ></classroom-invitation-modal>
  </div>

  <not-found v-else></not-found>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
