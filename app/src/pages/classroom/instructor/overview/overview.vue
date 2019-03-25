<template>
  <div class="classroom page">
    <classroom-header>
      <template slot="actions">
        <icon-user-plus></icon-user-plus>
        <icon-settings></icon-settings>
      </template>
    </classroom-header>

    <div class="grid" v-bind:class="{ unfetched: !fetched }">
      <dashboard-card class="students">
        <template slot="label">{{ (students || []).length || '' }} Students</template>
        <template slot="link">View all</template>
      </dashboard-card>

      <dashboard-card class="assignments">
        <template slot="label">{{ (assignments || []).length || '' }} Assignments</template>
        <template slot="link">View all</template>
      </dashboard-card>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
