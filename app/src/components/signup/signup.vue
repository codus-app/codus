<template>
  <form class="signup-form" v-on:keydown.enter="signup">
    <!-- 1. First and last name -->
    <div>
      <i class="material-icons">mood</i>
      <div>
        <input type="text" v-model="firstName" placeholder="First name" ref="firstNameInput">
        <input type="text" v-model="lastName" placeholder="Last name" ref="lastNameInput">
      </div>
    </div>
    <!-- 2. Email -->
    <div>
      <i class="material-icons">email</i>
      <input type="text" v-model="email" placeholder="email" ref="emailInput">
    </div>
    <!-- 3. Username -->
    <div>
      <i class="material-icons">person</i>
      <input type="text" v-model="username" placeholder="username" ref="usernameInput">
    </div>
    <!-- 4. Password -->
    <div>
      <i class="material-icons">vpn_key</i>
      <input type="password" v-model="password" placeholder="password" ref="passwordInput">
    </div>
    <!-- Sign up -->
    <a v-on:click="signup">Sign up</a>
  </form>
</template>

<script src="./script.js"></script>
<style scoped lang="sass">
  @import '../login/style.sass'
</style>
