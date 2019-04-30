<template>
  <div class="assignment-list-item" v-bind:class="{ expanded }">
    <!-- Detect click “intent” - we collapse the assignment temporarily if the user is about to drag
         to change the assignment order. However, in some cases, if the user is slow to click, they
         may click for long enough that we collapse the assignment for "drag" intent. If the user
         releases a drag within 600ms, the assignment will remain closed, and not reopen. Clicks
         longer than 600ms strongly indicate "drag" intent, so we will reopen the assignment as in a
         cancelled drag only if the click lasted longer than 600ms. -->
    <div
      class="top"
      v-on:click="() => { if (!expanded || clickDuration() < 600) toggle(); holdStart = null; }"
      v-on:mousedown="
        holdTimeout = setTimeout(() => { $emit('dragPress'); }, 200);
        holdStart = new Date();
      "
      v-on:mouseup="clearTimeout(holdTimeout)"
      v-on:contextmenu="$event.preventDefault(); openContextMenu()"
    >
      <div class="icon"><icon-clipboard></icon-clipboard></div>
      <div class="info">
        <h2>{{ assignment.name }}</h2>
        <div class="due">
          <icon-calendar></icon-calendar>
          {{ formatDueDate(assignment.dueDate) }}
        </div>
      </div>
      <div class="actions">
        <icon-more
          v-bind:name="`more-${_uid}`"
          ref="contextMenuTrigger"
          v-on:click="$event.stopPropagation()"
        ></icon-more>
        <icon-menu
          class="reorder"
          v-on:mousedown="$emit('dragPress'); $event.stopPropagation();"
          v-on:click="$event.stopPropagation()"
          v-on:contextmenu="$event.preventDefault()"
        ></icon-menu>
      </div>

      <context-menu
        v-bind:target-name="`more-${_uid}`"
        v-bind:theme="expanded ? 'codus-context-contrast' : null"
        placement="bottom-end"
        v-bind:items="[
          {
            icon: 'external-link', label: 'Open',
            onclick: () => $router.push(link),
          },
          { icon: 'copy', label: 'Copy link', onclick: copyLink },
          { icon: 'trash', label: 'Delete', onclick: () => $emit('delete') },
        ]"
    ></context-menu>
    </div>

    <transition-expand axis="y" v-bind:transition-duration="300">
      <div class="bottom-content" v-if="expanded">{{ assignment.description }}</div>
    </transition-expand>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
