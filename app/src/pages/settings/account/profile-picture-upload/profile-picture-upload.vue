<template>
  <div class="profile-picture-upload">
    <div
      class="circle-modal"
      v-bind:class="{ open: modalOpen }"
    >
      <div class="scrim" v-on:click="modalOpen = false"></div>
      <div class="circle"></div>
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
