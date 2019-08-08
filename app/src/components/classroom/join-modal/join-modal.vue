<template>
  <modal
    wide
    fade-color="rgba(30, 30, 33, .4)"
    v-bind:modalStyle="{ backgroundColor: '#131313' }"
    v-bind:open="open"
    v-on:close="$emit('close')"
  >

    <template v-slot:header>
      <h1>
        <template v-if="!classroom">Join a classroom</template>
        <template v-else>You're already in a classroom</template>
      </h1>
    </template>

    <p>
      <template v-if="!classroom">Enter a classroom invite code</template>
      <template v-else>Leave {{ classroom.name }} before joining another classroom.</template>
    </p>

    <action-input
      v-if="!classroom"
      v-model="codeToJoin"
      placeholder="6 characters"
      v-bind:onClick="() => joinClassroom(codeToJoin)"
    ></action-input>
  </modal>
</template>

<script src="./script.js"></script>

<!-- <style scoped lang="sass" src="./style.sass"></style> -->
