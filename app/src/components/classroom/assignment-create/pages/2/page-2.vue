<template>
  <div class="assignment-creation-page page-2">
    <div class="page-content">
      <div class="header">
        <div>
          <h2>Add some problems</h2>
          <h3>{{ selected.length || 'None' }} selected</h3>
        </div>
        <p>Click a problem to select it. Hover over a problem to see problem info.
          {{ $nativizeShortcut('mod+Click') }}
          to open the problem in a new browser tab.
        </p>
      </div>

      <proceed-button v-bind:disabled="false" v-on:click="$emit('next')">
        <template slot="label">Next step</template>
        Final details
      </proceed-button>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
