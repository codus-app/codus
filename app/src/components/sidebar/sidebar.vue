<template>
    <div class="sidebar">
      <div class="profile">
        <img src="https://arkisio.now.sh/profile/Conqueror1776" class="profile-image">
        <div class="profile-name">Elijah Tamarchenko</div>
      </div>

      <router-link class="sidebar-link" v-for="route in routes" v-bind:to="route.path" v-bind:exact="route.meta.exact || false">
        <i class="material-icons">{{route.meta.icon}}</i> {{route.meta.name}}
      </router-link>
    </div>
  </div>
</template>

<script>
import routes from '../../pages/app/routes';

export default {
  data: () => ({ routes }),
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
