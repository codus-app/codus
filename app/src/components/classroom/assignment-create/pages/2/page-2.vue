<template>
  <div class="assignment-creation-page page-2">
    <div class="page-content">
      <div class="header">
        <div>
          <h2>Add some problems</h2>
          <h3>{{ selected.length || 'None' }} selected</h3>
        </div>
        <p>Click a problem to select it. Hover over a problem to see problem info.
          {{ $nativizeShortcut('mod+Click') }}
          to open the problem in a new browser tab.
        </p>
      </div>

      <simplebar class="problems-select">
        <div ref="scrollContentContainer">
          <div
            class="category"
            v-for="category in categories.filter(c => c.problems.length)"
            v-bind:key="category.name"
          >
            <h3>{{ category.displayName }}</h3>
            <div
              class="problem"
              v-for="problem in category.problems"
              v-bind:key="problem.name"
              v-bind:class="{ selected: isSelected(category.name, problem.name) }"
              v-on:click="() => {
                if (isSelected(category.name, problem.name)) deselect(category.name, problem.name);
                else select(category.name, problem.name);
              }"
            >
              {{ problem.name }}
            </div>
          </div>
        </div>
      </simplebar>

      <div class="bottom-fade"></div>

      <proceed-button v-bind:disabled="false" v-on:click="$emit('next')">
        <template slot="label">Next step</template>
        Final details
      </proceed-button>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
