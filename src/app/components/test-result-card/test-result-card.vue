<template>
  <div class="test-result-card code light">
    <div class="status-indicator" v-bind:class="{ green: passed, red: passed === false }"></div>

    <div class="collapsed" v-if="!expanded">
      main({{ parameters.map(p => JSON.stringify(p)).join(', ') }})
      ->
      {{ JSON.stringify(expectedResult) }}
    </div>

    <div class="expanded" v-if="expanded">
      <p>
        <span>Function call:</span>
        main({{ parameters.map(p => JSON.stringify(p)).join(', ') }})
        <br/>
        <span>Expected result:</span>
        {{ JSON.stringify(expectedResult) }}
      </p>

      <p>
        <span>Your solution returned:</span>
        {{ JSON.stringify(result) }}
        <br/>
        <span>Pass:</span> {{ passed }}
      </p>
    </div>

    <icon-chevron-down
      class="expand-arrow"
      v-on:click="expanded = !expanded"
      v-bind:class="{ flipped: expanded }"
    ></icon-chevron-down>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
