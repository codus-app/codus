<template>
    <div class="sidebar">
      <div class="profile">
        <img v-bind:src="profile.picture" class="profile-image">
        <div class="profile-name">{{ profile.user_metadata.name }}</div>
      </div>

      <router-link class="sidebar-link" v-for="route in routes" v-bind:key="route.path" v-bind:to="route.path" v-bind:exact="route.meta.exact || false">
        <i class="material-icons">{{route.meta.icon}}</i> {{route.meta.label}}
      </router-link>
    </div>
  </div>
</template>

<script>
import routes from '../../pages/app/routes';

export default {
  data: () => ({ routes }),
  computed: {
    profile: () => JSON.parse(localStorage.getItem('profile')),
  },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
