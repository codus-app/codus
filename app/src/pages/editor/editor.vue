<template>
  <div class="editor-page">
    <!-- Problem browser -->
    <div class="problem-browser" v-bind:class="{ collapsed: problemBrowserCollapsed }">
      <div class="head">Problems</div>
      <icon-chevrons-left
        v-on:click="problemBrowserCollapsed = true"
        v-tippy
        v-bind:title="`Close Sidebar <kbd>${$nativizeShortcut('mod+\\')}</kbd>`"
      ></icon-chevrons-left>
      <problems-tree class="listing"></problems-tree>
    </div>

    <!-- Code editing -->
    <div class="editor" ref="windowBounds">
      <div class="top-bar">
        <icon-play
          class="button"
          v-on:click="solutionCheck"
          v-if="!solutionCheckInProgress"
          v-tippy
          v-bind:title="`Run <kbd>${$nativizeShortcut('mod+R')}</kbd>`"
        />
        <spinner v-if="solutionCheckInProgress"></spinner>

        <icon-trash
          class="button"
          v-on:click="() => { this.deletionConfirmOpen = true; }"
          v-tippy
          v-bind:title="`Reset solution <kbd>${$nativizeShortcut('mod+shift+backspace')}</kbd>`"
        />
        <icon-settings class="button"/>
        <save-status v-bind:status="saveStatus"/>
        <breadcrumbs v-bind:crumbs="[categoryName, problemName]"></breadcrumbs>
        <div class="open-sidebar" v-bind:class="{ collapsed: !problemBrowserCollapsed }">
          <icon-menu
            v-on:click="problemBrowserCollapsed = false"
            v-tippy
            v-bind:title="`Open Sidebar <kbd>${$nativizeShortcut('mod+\\')}</kbd>`"
          ></icon-menu>
        </div>
      </div>

      <codemirror
        v-bind:class="{ 'problem-browser-collapsed': problemBrowserCollapsed }"
        v-bind:value="code"
        v-on:input="onInput"
        v-bind:options="cmOptions"
      ></codemirror>

      <div class="cards">
        <problem-overview-card
          v-if="fetched"
          v-bind:problem="problem"
          v-bind:progress="progress"
        ></problem-overview-card>

        <div class="message" v-if="fetched" v-bind:class="{ run: testResults.length }">
          <div class="title">Tests</div>

          <div class="help">
            <div class="line-1">It looks like you haven't tested this code yet.</div>
            <div>
              Press <icon-play
                v-on:click="solutionCheck"
                v-bind:class="{ checking: solutionCheckInProgress }"
              ></icon-play> to test your solution
            </div>
          </div>
        </div>

        <div class="tests" v-if="fetched" v-bind:class="{ outdated: testResults.length && code !== testedCode }">
          <test-case-card
            v-for="(t, i) in tests"
            v-bind="t"
            v-bind:key="i"
            v-bind:error="errorMessage"
          ></test-case-card>

          <div
            class="hidden-tests"
            v-bind:class="{
              passed: testResults.length && numHiddenTestsPassed === numHiddenTests,
              failed: testResults.length && numHiddenTestsPassed !== numHiddenTests,
            }"
            v-if="numHiddenTests"
          >
            <span v-if="testResults.length">{{ numHiddenTestsPassed }}/</span><!--
         -->{{ numHiddenTests }} hidden test cases
          </div>
        </div>
      </div>

      <transition name="pop-up">
        <window
          class="output"
          v-bind:class="{ 'has-error': errorMessage, outdated: code !== testedCode && outputCollapsed }"
          v-if="hasOutput"
          v-bind:collapsed="outputCollapsed"
          v-bind:bounds="outputWindowBounds"
          v-on:expand="outputCollapsed = false"
          v-on:collapse="outputCollapsed = true"
        >
          <template slot="title">Output</template>
          <div class="error-message">{{ errorMessage }}</div>
        </window>
      </transition>

      <confirm-modal v-bind:open="deletionConfirmOpen" v-bind:on-cancel="() => { this.deletionConfirmOpen = false; }">
        <h1 slot="header">Delete this solution?</h1>
        Your solution to this problem will be reset. This cannot be undone.
        <button class="button bg red" slot="button" v-on:click="reset">Delete</button>
      </confirm-modal>
    </div>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
