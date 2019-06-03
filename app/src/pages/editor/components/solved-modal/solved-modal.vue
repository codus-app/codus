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
          padding: '10rem 1.25rem 1.75rem',
        }"
        fade-color="rgba(12, 12, 12, .65)"
      >
        <slot>
          <h2>Congratulations!</h2>
          <p>You’ve solved this problem. Don’t stop now; move on to the next one!</p>
          <router-link class="onward" v-bind:to="nextUrl">Onward!</router-link>
        </slot>


        <div class="illustration">
          <div class="center">
            <icon-check-circle></icon-check-circle>
          </div>

          <div class="rings">
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="cutout"></div>
          </div>
        </div>
      </modal>
  </portal>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
