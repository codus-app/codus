<template>
  <div class="sidebar">
    <div v-if="user" class="profile">
      <div class="overlay-image" v-on:click="logout">
        <img v-bind:src="user.picture" class="profile-image">
        <div class="material-icons">power_settings_new</div>
      </div>
      <div class="profile-name">{{ user.user_metadata.name }}</div>
    </div>

    <router-link class="sidebar-link" v-for="route in routes" v-bind:key="route.path" v-bind:to="route.path" v-bind:exact="route.meta.exact || false">
      <i class="material-icons">{{route.meta.icon}}</i> {{route.meta.label}}
    </router-link>
  </div>
</template>

<script>
import auth from '../../../scripts/auth';
import routes from '../../pages';

export default {
  data: () => ({
    routes,
    user: JSON.parse(localStorage.getItem('user')),
  }),
  methods: {
    logout() {
      auth.logout();
    },
  },
  created() {
    this.$root.$on('loggedIn', () => {
      this.user = JSON.parse(localStorage.getItem('user'));
    });
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
