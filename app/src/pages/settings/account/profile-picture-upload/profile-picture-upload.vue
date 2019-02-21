<template>
  <div class="profile-picture-upload">
    <!-- Old picture (displayed with overlay) -->

    <div class="picture"
      v-bind:class="{ dragging: dropOver, dropped: !!imageDataURL.length }"
      v-on:click="browse"
      v-on:dragenter="dropOver = true;"
      v-on:dragleave="dropOver = false;"
      v-on:drop="handleFile"
      v-bind:style="{ backgroundImage: `url(${url})` }"
    >
      <div class="scrim"></div>
      <!-- Default display: "change" CTA with camera icon -->
      <div class="overlay cta">
        <icon-camera></icon-camera>
        <div class="label">{{ hasDefaultPicture ? 'Upload' : 'Change'}}</div>
      </div>
      <!-- When dragging, display a "cloud upload" icon -->
      <div class="overlay dragging">
        <icon-upload-cloud></icon-upload-cloud>
      </div>
    </div>

    <div
      class="new-picture"
      v-bind:class="{ empty: !imageDataURL.length }"
      v-bind:style="{ backgroundImage: imageDataURL ? `url(${imageDataURL})` : '' }"
    ></div>

    <input
      ref="fileInput"
      type="file"
      accept="image/png, image/jpeg, image/gif"
      v-on:change="handleFile"
    >

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
