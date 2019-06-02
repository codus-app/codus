<template>
  <portal to="modal-target">
    <modal
        class="solved-modal"
        v-bind:open="open" v-on:close="$emit('close')"
        v-bind:wide="true"
        v-bind:modalStyle="{
          backgroundColor: '#f7f7f7',
          color: '#2e2e33',
          width: '14rem',
          padding: '10rem 1.25rem 2rem',
        }"
      >
        <div class="illustration">
          <div class="center">
            <icon-check-circle></icon-check-circle>
          </div>
          <div class="ring1"></div>
          <div class="ring2"></div>
          <div class="ring3"></div>
          <div class="ring4"></div>
        </div>
        <h2>Congratulations!</h2>
        <p>You’ve solved this problem. Don’t stop now; move on to the next one!</p>
        <router-link class="onward" v-bind:to="nextUrl">Onward!</router-link>
      </modal>
  </portal>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
