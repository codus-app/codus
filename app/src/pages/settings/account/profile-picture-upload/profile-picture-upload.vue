<template>
  <div class="profile-picture-upload">
    <div class="circle-modal" v-bind:class="{ open: modalOpen }">
      <div class="circle"></div>
      <div class="scrim" v-on:click="close"></div>
    </div>

    <div class="upload">
      <div
        class="upload-window"
        v-bind:class="{ open: modalOpen, 'drop-over': dropOver, 'has-dragged': hasDragged, dropped }"
        v-on:dragenter="dropOver = true; hasDragged = true;"
        v-on:dragleave="handleDragLeave"
        v-on:drop="handleFile"
        v-on:click="browse"
      >
        <div class="rings">
          <div class="ring" v-for="i in 3" v-bind:key="i"></div>
        </div>

        <icon-upload-cloud></icon-upload-cloud>

        <input
          ref="fileInput"
          type="file"
          accept="image/png, image/jpeg, image/gif"
          v-on:change="handleFile"
        >

        <div
          class="new-picture"
          v-bind:class="{ empty: !imageDataURL.length }"
          v-bind:style="{ backgroundImage: imageDataURL ? `url(${imageDataURL})` : '' }"
        ></div>
      </div>
    </div>

    <div class="picture"
      v-on:click="modalOpen = true; modalOpenedFromDrag = false;"
      v-on:dragenter="modalOpen = true; modalOpenedFromDrag = true; dropOver = true; hasDragged = true;"
      v-bind:style="{ backgroundImage: `url(${url})` }"
    >
      <div class="center">
        <icon-camera></icon-camera>
        <div class="label">{{ hasDefaultPicture ? 'Upload' : 'Change'}}</div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
