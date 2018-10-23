<template>
  <div class="editor-page">
    <!-- Problem browser -->
    <div class="problem-browser">
      <div class="head font-1 medium">Problems</div>
      <problems-tree class="listing"></problems-tree>
    </div>

    <!-- Code editing -->
    <div class="editor">
      <div class="top-bar">
        <icon-play class="button" v-on:click="solutionCheck"/>
        <icon-trash class="button" v-on:click="() => { this.deletionConfirmOpen = true; }"/>
        <icon-share class="button"/>
        <icon-settings class="button"/>
        <save-status v-bind:saving="saving"/>
      </div>

      <codemirror v-bind:value="code" v-on:input="onInput" v-bind:options="cmOptions"></codemirror>

      <problem-overview-card
        v-if="fetched"
        v-bind:problem="problem"
        v-bind:progress="0.5"
      ></problem-overview-card>

      <confirm-modal v-bind:open="deletionConfirmOpen" v-bind:on-cancel="() => { this.deletionConfirmOpen = false; }">
        <h1 slot="header">Delete this solution?</h1>
        Your solution to this problem will be reset. This cannot be undone.
        <button class="button bg red" slot="button" v-on:click="reset">Delete</button>
      </confirm-modal>
    </div>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
