<template>
  <div class="sidebar" v-bind:class="{ collapsed }">
    <h1 v-if="!collapsed">Codus</h1>

    <div class="links">

      <!-- Personal user-related links -->
      <h2 v-if="!collapsed">You</h2>
      <router-link class="sb-link" v-for="r in userRoutes" v-bind:key="r.path" v-bind:to="r.path">
        <div class="indicator" v-if="!collapsed"></div>
        <component v-bind:is="`${r.meta.icon}-icon`"></component>
        <span class="montserrat extralight" v-if="!collapsed">{{r.meta.label}}</span>
      </router-link>

      <div class="divider" v-if="collapsed"></div> <!-- For spacing if sidebar is collapsed -->

      <!-- Class-related links -->
      <h2 v-if="!collapsed">Class</h2>
      <router-link class="sb-link" v-for="r in classRoutes" v-bind:key="r.path" v-bind:to="r.path">
        <div class="indicator" v-if="!collapsed"></div>
        <component v-bind:is="`${r.meta.icon}-icon`"></component>
        <span class="montserrat extralight" v-if="!collapsed">{{r.meta.label}}</span>
      </router-link>

      <div class="sb-link logout" v-on:click="logout">
        <log-out-icon></log-out-icon>
        <span class="montserrat light" v-if="!collapsed">Log out</span>
      </div>

    </div>
  </div>
</template>

<script>

import routes from '../../pages';
import auth from '../../../auth';

export default {
  data: () => ({
    userRoutes: routes.filter(r => r.meta.category === 'user'),
    classRoutes: routes.filter(r => r.meta.category === 'class'),

    collapsed: false,
  }),

  methods: { logout: auth.logout },
};

</script>

<style scoped lang="sass" src='./style.sass'></style>
