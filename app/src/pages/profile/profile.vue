<template>
  <div class="page">
    <div class="top">
      <div class="summary card" v-bind:class="{ empty: !profileLoaded }">
        <user-profile-summary v-bind:profile="profile"></user-profile-summary>
        <router-link class="edit" to="/settings/account">
          <icon-more></icon-more>
        </router-link>
      </div>
      <div class="detail card c1" v-bind:class="{ empty: !profileLoaded }">
        <div class="left">
          <radial-progress
            type="ring"
            v-bind:progress="proportionSolved || 0"
            v-bind:transition-delay="150"
            v-bind:transition-duration="550"
          ></radial-progress>
        </div>
        <div class="right">
          <div class="large">{{ Math.floor(proportionSolved * 100)}}%</div>
          <div class="small">Problems solved</div>
        </div>
      </div>
      <div class="detail card c2 empty"></div>
      <div class="detail card c3 empty"></div>
      <div class="detail card c4 empty"></div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
