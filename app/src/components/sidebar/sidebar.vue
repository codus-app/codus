<template>
  <div class="sidebar" v-bind:class="{ collapsed }">
    <sidebar-user-profile
      v-bind:compact="collapsed"
      v-on:contextmenu.native="$event.preventDefault(); openContextMenu();"
    ></sidebar-user-profile>

    <icon-more name="sidebar-more" ref="contextMenuTrigger"></icon-more>
    <context-menu
      target-name="sidebar-more"
      v-bind:placement="collapsed ? 'right-start' : 'bottom-end'"
      v-bind:items="[
        {
          icon: 'user', label: 'View profile',
          onclick: () => $router.push(replaceParams('/user/:username'))
        },
        { icon: 'settings', label: 'Settings', onclick: () => $router.push('/settings/account') },
        { icon: 'log-out', label: 'Log out', onclick: logout },
      ]"
    ></context-menu>

    <div class="links">

      <!-- Links for student accounts -->
      <template v-if="role === 'student'">
        <h2 v-if="!collapsed">You</h2>
        <sidebar-link
          v-for="r in getRoutes('student/personal')"
          v-bind:key="r.path"
          v-bind="{ ...r, collapsed, replaceParams }"
        ></sidebar-link>

        <template v-if="studentClassroom">
          <h2 v-if="!collapsed">{{ studentClassroom.name }}</h2>
          <sidebar-link
            v-for="r in getRoutes('student/classroom')"
            v-bind:key="r.path"
            v-bind="{ ...r, collapsed, replaceParams }"
          ></sidebar-link>
        </template>

        <template v-else-if="!collapsed">
          <h2>Classroom</h2>
          <div class="sb-link green" v-on:click="$root.$emit('joinClassroom')">
            <icon-plus></icon-plus>
            <span v-bind:style="{ transform: 'translateX(-.15rem)' }">Join classroom</span>
          </div>
        </template>
      </template>

      <!-- Links for instructor accounts -->
      <template v-if="role === 'instructor'">
        <classroom-switcher v-if="instructorClassroomsFetched && !collapsed"></classroom-switcher>
        <div v-if="instructorClassroomsFetched && (instructorSelectedClassroom || !collapsed)">
          <sidebar-link
            v-for="r in getRoutes('instructor/classroom')"
            v-bind:key="r.path"
            v-bind="{ ...r, collapsed, disabled: !instructorSelectedClassroom, replaceParams }"
          ></sidebar-link>
        </div>

        <h2 v-if="!collapsed">Personal</h2>
        <div
          class="divider"
          v-else-if="instructorClassroomsFetched && instructorSelectedClassroom"
        ></div>
        <sidebar-link
          v-for="r in getRoutes('instructor/personal')"
          v-bind:key="r.path"
          v-bind="{ ...r, collapsed, replaceParams }"
        ></sidebar-link>
      </template>

      <div class="sb-link logout" v-on:click="logout" v-bind:title="collapsed ? 'Log out' : ''">
        <icon-log-out></icon-log-out>
        <span v-if="!collapsed">Log out</span>
      </div>

    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src='./style.sass'></style>
