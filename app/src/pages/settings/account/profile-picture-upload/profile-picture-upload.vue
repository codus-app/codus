<template>
  <div class="profile-picture-upload">
    <div class="picture" v-on:click="modalOpen = true" v-bind:style="{ backgroundImage: `url(${url})` }">
      <div class="center">
        <icon-camera></icon-camera>
        <div class="label">{{ hasDefaultPicture ? 'Upload' : 'Change'}}</div>
      </div>
    </div>

    <modal v-bind:wide="true" v-bind:open="modalOpen" v-on:close="modalOpen = false" fade-color="#1e1e21">
      <div
        class="upload-window"
        v-bind:class="{ 'drop-over': dropOver, dropped }"
        v-on:dragenter="dropOver = true"
        v-on:dragleave="dropOver = false"
        v-on:drop="dropped = true"
      >
        <!-- Rings -->
        <div class="rings">
          <div class="ring" v-for="i in 5" v-bind:key="i"></div>
        </div>

        <icon-upload-cloud></icon-upload-cloud>
    </modal>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
