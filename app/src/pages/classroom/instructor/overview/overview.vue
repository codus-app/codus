<template>
  <div
    class="cards-dashboard classroom page"
    v-bind:class="{ unfetched: !fetched }"
  >
    <classroom-header>
      <template slot="actions">
        <icon-user-plus v-on:click="$emit('open-invitation')"></icon-user-plus>
        <icon-file-plus v-on:click="$emit('create-assignment')"></icon-file-plus>
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
            v-bind:to="{
              name: 'classroom-students',
              params: { ...$route.params, username: student.username },
            }"
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
          <div class="cta" v-on:click="$emit('open-invitation')">
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
        <div class="assignments-list" v-if="assignments.length">
          <router-link
            class="assignment"
            v-for="assignment in displayAssignments.slice(0, 3)"
            v-bind:key="assignment.id"
            v-bind:to="{
              name: 'classroom-assignment-detail',
              params: { ...$route.params, assignmentId: assignment.id },
            }"
          >
            <div class="icon"><icon-clipboard></icon-clipboard></div>
            <div class="info">
              <h2>{{ assignment.name }}</h2>
              <div class="due">
                <icon-calendar></icon-calendar>
                {{ formatDueDate(assignment.dueDate) }}
              </div>
            </div>
          </router-link>
          <router-link
            class="view-more"
            v-if="numNotDisplayed"
            v-bind:to="{ name: 'classroom-assignments', params: $route.params }"
          >
            View {{ numNotDisplayed }} more assignment<span v-if="numNotDisplayed !== 1">s</span>
            <icon-arrow-right></icon-arrow-right>
          </router-link>
        </div>
        <div class="empty" v-else>
          <h3>No assignments found</h3>
          <div class="cta" v-on:click="$emit('create-assignment')">
            <icon-plus></icon-plus> Create assignment
          </div>
        </div>
      </dashboard-card>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
