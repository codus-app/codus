<template>
  <div class="sidebar" v-bind:class="{ collapsed }">
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

      <!-- Links for student accounts -->
      <template v-if="role === 'student'">
        <h2 v-if="!collapsed">You</h2>
        <sidebar-link v-for="r in getRoutes('student/personal')" v-bind:key="r.path" v-bind="{ ...r, collapsed, replaceParams }"></sidebar-link>
      </template>

      <!-- Links for instructor accounts -->
      <template v-if="role === 'instructor'">
        <classroom-switcher></classroom-switcher>
        <sidebar-link v-for="r in getRoutes('instructor/classroom')" v-bind:key="r.path" v-bind="{ ...r, collapsed, disabled: selectedClassroom === null, replaceParams }"></sidebar-link>
        <h2 v-if="!collapsed">Personal</h2>
        <sidebar-link v-for="r in getRoutes('instructor/personal')" v-bind:key="r.path" v-bind="{ ...r, collapsed, replaceParams }"></sidebar-link>
      </template>

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
