<template>
  <div>
    <transition name="modal-header-fade">
      <h1 v-if="!$store.state.loginShown">codus</h1>
    </transition>
    <canvas id="stars"></canvas>
    <modal bgcolor="rgba(0, 0, 0, 0.75)" v-if="$store.state.loginShown" v-on:close="$store.commit('toggleLogin')">
      <login></login>
    </modal>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
