<template>
    <div class="sidebar">
      <div class="profile">
        <div class="overlay-image" v-on:click="logout">
          <img v-bind:src="profile.picture" class="profile-image">
          <div class="material-icons">power_settings_new</div>
        </div>
        <div class="profile-name">{{ profile.user_metadata.name }}</div>
      </div>

      <router-link class="sidebar-link" v-for="route in routes" v-bind:key="route.path" v-bind:to="route.path" v-bind:exact="route.meta.exact || false">
        <i class="material-icons">{{route.meta.icon}}</i> {{route.meta.label}}
      </router-link>
    </div>
  </div>
</template>

<script>
import auth from '../../scripts/auth';
import routes from '../../pages/app/routes';

export default {
  data: () => ({
    routes,
    profile: JSON.parse(localStorage.getItem('profile')),
  }),
  methods: {
    logout() {
      auth.logout();
    },
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
