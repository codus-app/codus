<template>
  <div
    class="cards-dashboard classroom page"
    v-if="classroom !== null"
    v-bind:class="{ unfetched: !fetched }"
  >
    <classroom-header>
      <template slot="actions">
        <icon-user-plus v-on:click="$emit('open-invitation')"></icon-user-plus>
        <icon-settings></icon-settings>
      </template>
    </classroom-header>

    Students!
  </div>

  <not-found v-else></not-found>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
