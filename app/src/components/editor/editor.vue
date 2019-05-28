<template>
  <div class="editor-page">
    <!-- Problem browser -->
    <div class="problem-browser" v-bind:class="{ collapsed: problemBrowserCollapsed }">
      <div class="head">Problems</div>
      <icon-chevrons-left
        v-on:click="problemBrowserCollapsed = true"
        v-tippy="{ delay: [400, 0] }"
        v-bind:title="`Close Sidebar <kbd>${$nativizeShortcut('mod+\\')}</kbd>`"
      ></icon-chevrons-left>
      <simplebar class="problems-scroll" ref="problems-scroll">
        <problems-tree v-on:change="recalculateProblemsScroll"></problems-tree>
      </simplebar>
    </div>

    <!-- Code editing -->
    <div class="editor" ref="windowBounds">
      <!-- Top bar -->
      <div class="top-bar">
        <!-- Run button -->
        <spinner v-if="solutionCheckInProgress"></spinner>
        <icon-play
          v-else
          class="button"
          v-on:click="solutionCheck"
          v-tippy="{ delay: [400, 0] }"
          v-bind:title="`Run <kbd>${$nativizeShortcut('mod+Enter')}</kbd>`"
        />
        <!-- Find/replace button -->
        <icon-search
          class="button"
          v-on:click="findReplaceOpen = !findReplaceOpen"
          v-tippy="{ delay: [400, 0] }"
          v-bind:title="`Find / Replace <kbd>${$nativizeShortcut('mod+F')}</kbd>`"
        ></icon-search>
        <!-- Discard/reset button -->
        <icon-trash
          class="button"
          v-on:click="() => { this.deletionConfirmOpen = true; }"
          v-tippy="{ delay: [400, 0] }"
          v-bind:title="`Reset solution <kbd>${$nativizeShortcut('mod+Shift+backspace')}</kbd>`"
        />
        <!-- Settings button -->
        <!-- <icon-settings class="button"/> -->
        <!-- Save status indicator -->
        <save-status v-bind:status="saveStatus"/>
        <!-- Problem label (warmup > AddOne) -->
        <breadcrumbs v-bind:crumbs="[categoryName, problemName]"></breadcrumbs>
        <!-- "Open sidebar" button -->
        <div class="open-sidebar" v-bind:class="{ collapsed: !problemBrowserCollapsed }">
          <icon-menu
            v-on:click="problemBrowserCollapsed = false"
            v-tippy="{ delay: [400, 0] }"
            v-bind:title="`Open Sidebar <kbd>${$nativizeShortcut('mod+\\')}</kbd>`"
          ></icon-menu>
        </div>
      </div>

      <codemirror
        ref="codemirror"
        v-bind:class="{ 'problem-browser-collapsed': problemBrowserCollapsed }"
        v-bind:value="code"
        v-on:input="onInput"
        v-bind:options="cmOptions"
      ></codemirror>

      <!-- List on the right side of the editor -->
      <simplebar class="cards-scroll" ref="cards-scroll">
        <div class="cards">
          <transition v-on:enter="findReplaceEnter" v-on:leave="findReplaceLeave">
            <find-replace-card
              v-if="mounted && findReplaceOpen"
              v-bind:cm="$refs.codemirror"
              v-bind:code="code"
            ></find-replace-card> <!-- Wait for mount so that $refs.codemirror is defined -->
          </transition>
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

          <div
            class="tests"
            v-if="fetched"
            v-bind:class="{ outdated: testResults.length && code !== testedCode }"
          >
            <test-case-card
              v-for="(t, i) in tests"
              v-bind="t"
              v-bind:key="i"
              v-bind:error="errorMessage"
              v-on:change="recalculateCardsScroll"
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
      </simplebar>

      <transition name="pop-up">
        <window
          class="output"
          v-bind:class="{
            'has-error': errorMessage,
            outdated: code !== testedCode && outputCollapsed,
          }"
          v-if="hasOutput"
          v-bind:collapsed="outputCollapsed"
          v-bind:bounds="outputWindowBounds"
          v-on:expand="outputCollapsed = false"
          v-on:collapse="outputCollapsed = true"
        >
          <template v-slot:title>Output</template>
          <div class="error-message">{{ errorMessage }}</div>
        </window>
      </transition>

      <portal to="modal-target">
        <modal v-bind:open="deletionConfirmOpen" v-on:close="deletionConfirmOpen = false">
          <template v-slot:header> <h1>Delete this solution?</h1> </template>
          Your solution to this problem will be reset. This cannot be undone.
          <template v-slot:buttons>
            <bold-button type="red" v-on:click="reset">Delete</bold-button>
          </template>
        </modal>
      </portal>
    </div>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
