<template>
  <div class="profile-picture-upload">
    <div class="picture" v-on:click="modalOpen = true" v-bind:style="{ backgroundImage: `url(${url})` }">
      <div class="center">
        <icon-camera></icon-camera>
        <div class="label">{{ hasDefaultPicture ? 'Upload' : 'Change'}}</div>
      </div>
    </div>

    <modal v-bind:wide="true" v-bind:open="modalOpen" v-on:close="modalOpen = false" fade-color="#1e1e21">
    </modal>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
