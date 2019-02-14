<template>
  <div class="profile-picture-upload">
    <div class="circle-modal" v-bind:class="{ open: modalOpen }">
      <div class="circle"></div>
      <div class="scrim" v-on:click="modalOpen = false; dropOver = false; dropped = false;"></div>
    </div>

    <div class="upload">
      <div
        class="upload-window"
        v-bind:class="{ open: modalOpen, 'drop-over': dropOver, dropped }"
        v-on:dragenter="dropOver = true"
        v-on:dragleave="dropOver = false"
        v-on:drop="dropped = true"
      >
        <div class="rings">
          <div class="ring" v-for="i in 4" v-bind:key="i"></div>
        </div>

        <icon-upload-cloud></icon-upload-cloud>
      </div>
    </div>

    <div class="picture" v-on:click="modalOpen = true" v-bind:style="{ backgroundImage: `url(${url})` }">
      <div class="center">
        <icon-camera></icon-camera>
        <div class="label">{{ hasDefaultPicture ? 'Upload' : 'Change'}}</div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
