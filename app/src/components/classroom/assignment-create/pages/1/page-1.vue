<template>
  <div
    class="assignment-creation-page page-1"
    v-on:keydown.enter="() => { if (valid) $emit('next'); }"
  >
    <label>
      <input
        type="text"
        name="title"
        id="assignment-create-name"
        class="h1-input"
        placeholder="Name this assignment"
        autocomplete="off"
        v-bind:value="name"
        v-on:input="$emit('update:name', $event.target.value)"
      >
      <span>Assignment title</span>
    </label>


    <label>
      <textarea
        name="description"
        id="assignment-create-description"
        rows="8"
        placeholder="Optionally, add a description or a few instructions to this assignment"
        autocomplete="off"
        v-bind:value="description"
        v-on:input="$emit('update:description', $event.target.value)"
      ></textarea>
      <span for="assignment-create-description">Instructions</span>
    </label>

    <proceed-button v-bind:disabled="!valid" v-on:click="$emit('next')">
      <template v-slot:label>Next step</template>
      Add problems
    </proceed-button>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
