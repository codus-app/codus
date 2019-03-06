<template>
  <div class="sidebar" v-bind:class="{ collapsed }">
    <!-- <h1 v-if="!collapsed">Codus</h1> -->
    <sidebar-user-profile
      v-bind:compact="collapsed"
      v-on:contextmenu.native="$event.preventDefault(); openContextMenu();"
    ></sidebar-user-profile>

    <icon-more name="sidebar-more" ref="contextmenuTrigger"></icon-more>
    <context-menu
      target-name="sidebar-more"
      v-bind:placement="collapsed ? 'right-start' : 'bottom-end'"
      v-bind:items="[
        { icon: 'user', label: 'View profile', onclick: () => $router.push(replaceParams('/user/:username')) },
        { icon: 'settings', label: 'Settings', onclick: () => $router.push('/settings/account') },
        { icon: 'log-out', label: 'Log out', onclick: logout },
      ]"
    ></context-menu>

    <div class="links">

      <!-- Personal user-related links -->
      <h2 v-if="!collapsed">You</h2>
      <router-link class="sb-link" v-for="r in userRoutes" v-bind:key="r.path" v-bind:to="replaceParams(r.path)" v-bind:title="collapsed ? r.meta.label : ''">
        <div class="indicator" v-if="!collapsed"></div>
        <component v-bind:is="`icon-${r.meta.icon}`" v-bind:style="{ transform: r.meta.iconTransform }"></component>
        <span v-if="!collapsed">{{r.meta.label}}</span>
      </router-link>

      <div class="divider" v-if="collapsed"></div> <!-- For spacing between sections if sidebar is collapsed -->

      <div class="sb-link logout" v-on:click="logout" v-bind:title="collapsed ? 'Log out' : ''">
        <icon-log-out></icon-log-out>
        <span v-if="!collapsed">Log out</span>
      </div>

    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src='./style.sass'></style>
