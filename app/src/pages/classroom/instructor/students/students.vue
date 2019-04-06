<template>
  <div
    class="cards-dashboard classroom page"
    v-bind:class="{ unfetched: !fetched }"
  >
    <classroom-header>
      <template slot="actions">
        <icon-user-plus v-on:click="$emit('open-invitation')"></icon-user-plus>
        <icon-settings></icon-settings>
      </template>
    </classroom-header>

    <div class="page-content">
      <div class="left students-list">
        <simplebar>
          <router-link
            class="student"
            v-for="student in students"
            v-bind:to="{
              name: 'classroom-students',
              params: { ...$route.params, username: student.username }
            }"
            v-bind:key="student.username"
          >
            <div
              class="image"
              v-bind:style="{
                'background-image': `url(${student.picture})`,
                ...student.picture.endsWith('avatar.svg') && { filter: 'brightness(80%)' },
              }"
            ></div>
            <div class="info">
              <div class="name">{{ student.name }}</div>
              <div class="username"><icon-at-sign></icon-at-sign> {{ student.username }}</div>
            </div>
          </router-link>
        </simplebar>
      </div>

      <div class="right" v-bind:class="{ empty: fetched && this.selectedStudent === null }">
        <user-profile
          class="student-details"
          v-if="fetched && this.selectedStudent !== null"
          v-bind:passed-profile="selectedStudent"
          v-bind:context-items="profileContextItems"
        >
          <div class="detail card c2" slot="card-2">
            <div class="left gradient">
              <icon-arrow-up-circle></icon-arrow-up-circle>
            </div>
            <div class="right">
              <div class="large">{{ selectedStudent.rank }}</div>
              <div class="small">Class rank</div>
            </div>
          </div>
        </user-profile>
        <div class="empty-message" v-else-if="fetched">
          Select a student from the list to the left to view detailed information here
        </div>
        <div class="loading" v-else></div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
