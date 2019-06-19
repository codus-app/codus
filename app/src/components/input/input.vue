<template>
  <div class="input" v-bind:class="status">
    <label v-bind:for="_uid" class="title">{{ title }}</label>
    <div class="input-container">
      <input
        type="text"
        v-bind:id="_uid"
        v-bind:placeholder="placeholder"
        v-bind:value="value"
        v-bind:disabled="disabled"
        v-on:input="onInput"
      >

      <div class="indicator-wrapper">
        <component class="indicator" v-if="charLimit == null" v-bind:is="{
          neutral: undefined,
          success: 'icon-check',
          failure: 'icon-x',
          loading: 'spinner'
        }[status]"></component>

        <div
          class="counter"
          v-bind:class="{ invalid: !charsValid }"
          v-if="charLimit != null"
        >{{ charsRemaining }}</div>
      </div>
    </div>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
