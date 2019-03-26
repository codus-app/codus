<template>
  <div class="classroom page" v-bind:class="{ unfetched: !fetched }">
    <classroom-header>
      <template slot="actions">
        <icon-user-plus></icon-user-plus>
        <icon-settings></icon-settings>
      </template>
    </classroom-header>

    <div class="row">
      <dashboard-card class="students">
        <template slot="label">{{ students.length || '' }} Students</template>
        <template slot="link">View all</template>
        <ul class="students-list" v-if="students">
          <li class="student" v-for="student in students.slice(0, 8)" v-bind:key="student.username">
            <div
              class="image"
              v-bind:style="{ 'background-image': `url(${student.picture})` }"
            ></div>
            <div class="name">{{ student.name }}</div>
          </li>
        </ul>
      </dashboard-card>

      <dashboard-card class="assignments">
        <template slot="label">{{ assignments.length || '' }} Assignments</template>
        <template slot="link">View all</template>
      </dashboard-card>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
