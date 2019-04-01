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

    Students!

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
