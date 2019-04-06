<template>
  <div class="cards-dashboard page" v-if="!notFound">
    <div class="top">
      <div class="summary card" v-bind:class="{ empty: !profileLoaded }">
        <user-profile-summary v-bind:profile="profile"></user-profile-summary>
        <component
          name="profile-summary-more"
          v-bind:is="isAuthenticatedUser ? 'icon-settings' : 'icon-more'"
        ></component>
        <context-menu
          target-name="profile-summary-more"
          placement="bottom-end"
          v-bind:items="profileContextItems"
        ></context-menu>
      </div>
      <slot name="card-1">
        <div
          class="detail card c1"
          style="cursor: pointer"
          v-bind:class="{ empty: !profileLoaded }"
          v-on:click="exactSolutions = !exactSolutions"
        >
          <div class="left">
            <radial-progress
              type="ring"
              v-bind:progress="proportionSolved || 0"
              v-bind:transition-delay="150"
              v-bind:transition-duration="550"
            ></radial-progress>
          </div>
          <div class="right">
            <div class="large" v-if="exactSolutions && profile.solutionProgress">
              {{ profile.solutionProgress[0] }}
            </div>
            <div class="large" v-else>{{ Math.floor(proportionSolved * 100)}}%</div>
            <div class="small">Problems solved</div>
          </div>
        </div>
      </slot>
      <slot name="card-2"><div class="detail card c2 empty"></div></slot>
      <slot name="card-3"><div class="detail card c3 empty"></div></slot>
      <slot name="card-4"><div class="detail card c4 empty"></div></slot>
    </div>
  </div>
  <not-found v-else></not-found>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
