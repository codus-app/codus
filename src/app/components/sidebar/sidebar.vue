<template>
  <div class="sidebar">
    <h1>Codus</h1>

    <div class="links">

      <!-- Personal user-related links -->
      <h2>You</h2>
      <router-link class="sb-link" v-for="r in userRoutes" v-bind:key="r.path" v-bind:to="r.path">
        <div class="indicator"></div>
        <component v-bind:is="`${r.meta.icon}-icon`"></component>
        <span class="montserrat light">{{r.meta.label}}</span>
      </router-link>

      <!-- Class-related links -->
      <h2>Class</h2>
      <router-link class="sb-link" v-for="r in classRoutes" v-bind:key="r.path" v-bind:to="r.path">
        <div class="indicator"></div>
        <component v-bind:is="`${r.meta.icon}-icon`"></component>
        <span class="montserrat light">{{r.meta.label}}</span>
      </router-link>

    </div>
  </div>
</template>

<script>

import routes from '../../pages';

export default {
  data: () => ({
    userRoutes: routes.filter(r => r.meta.category === 'user'),
    classRoutes: routes.filter(r => r.meta.category === 'class'),
  }),
};

</script>

<style scoped lang="sass" src='./style.sass'></style>
