<template>
  <div style="overflow: hidden">
    <div class="find-replace-card">
      <div class="title">Find + Replace</div>
      <div class="group">
        <input
          type="text"
          ref="find"
          v-bind:class="{ mousetrap: true, 'no-matches': query.length && !hasMatches }"
          placeholder="Find text"
          v-model="query"
          v-on:keydown.enter="find(false)"
        >
        <button v-on:click="find">Find</button>
      </div>
      <div class="group">
        <input
          type="text"
          class="mousetrap"
          placeholder="Replace text"
          v-model="replaceText"
          v-on:keydown.enter="handleReplace($event, false)"
        >
        <button
          v-on:click="handleReplace"
          v-tippy="{ delay: [1500, 0], arrowTransform: 'scale(0.55)' }"
          title="<span style=&quot;color: rgba(0, 0, 0, 0.65)&quot;>Hold <span style=&quot;color: rgb(0, 0, 0); font-weight: 600;&quot;>Shift</span> to <br/>Replace All</span>"
        >Replace</button>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
