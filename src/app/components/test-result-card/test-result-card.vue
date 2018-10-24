<template>
  <div class="test-result-card code light" v-bind:class="{ expanded }" v-on:click="expanded = !expanded">
    <div class="status-indicator" v-bind:class="{ green: passed, red: passed === false }"></div>

    <div class="layout collapsed">
      main({{ parameters.map(p => JSON.stringify(p)).join(', ') }})
      ->
      {{ JSON.stringify(expectedResult) }}
    </div>

    <div class="layout expanded">
      <p>
        <span class="bold">Function call:</span>
        main({{ parameters.map(p => JSON.stringify(p)).join(', ') }})
        <br/>
        <span class="bold">Expected result:</span>
        {{ JSON.stringify(expectedResult) }}
      </p>

      <p>
        <span class="bold">Your solution returned:</span>
        {{ JSON.stringify(result) }}
        <br/>
        <span class="bold">Pass:</span> {{ passed }}
      </p>
    </div>

    <icon-chevron-down class="expand-arrow" v-bind:class="{ flipped: expanded }"></icon-chevron-down>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
