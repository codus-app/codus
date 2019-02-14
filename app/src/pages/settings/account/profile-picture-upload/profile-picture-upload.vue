<template>
  <div class="profile-picture-upload">
    <div class="picture" v-bind:style="{ backgroundImage: `url(${url})` }">
      <div class="center">
        <icon-camera></icon-camera>
        <div class="label">{{ hasDefaultPicture ? 'Upload' : 'Change'}}</div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
