<template>
  <div class="sidebar" v-bind:class="{ collapsed }">
    <!-- <h1 v-if="!collapsed">Codus</h1> -->
    <sidebar-user-profile v-bind:compact="collapsed"></sidebar-user-profile>

    <div class="links">

      <!-- Personal user-related links -->
      <h2 v-if="!collapsed">You</h2>
      <router-link class="sb-link" v-for="r in userRoutes" v-bind:key="r.path" v-bind:to="replaceParams(r.path)" v-bind:title="collapsed ? r.meta.label : ''">
        <div class="indicator" v-if="!collapsed"></div>
        <component v-bind:is="`icon-${r.meta.icon}`"></component>
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

<script>

import routes from '../../pages';
import { mapActions, mapGetters } from 'vuex';

export default {
  props: { collapsed: Boolean },

  data: () => ({
    userRoutes: routes.filter(r => r.meta.category === 'user'),
  }),

  computed: { ...mapGetters(['profile']) },

  methods: {
    ...mapActions({ logout: 'auth/logout' }),

    replaceParams(path) {
      // Replace '/:username' with the user's username
      return path.replace(/\/:username(?=$|\/)/g, `/${this.profile.username || this.profile.nickname}`);
    },
  },
};

</script>

<style scoped lang="sass" src='./style.sass'></style>
