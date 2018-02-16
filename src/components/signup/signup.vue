<template>
  <form class="signup-form" v-on:keydown.enter="signup">
    <!-- 1. First and last name -->
    <div>
      <user-icon></user-icon>
      <div>
        <input type="text" v-model="firstName" placeholder="first" ref="firstNameInput">
        <input type="text" v-model="lastName" placeholder="last" ref="lastNameInput">
      </div>
    </div>
    <!-- 2. Email -->
    <div>
      <mail-icon></mail-icon>
      <input type="text" v-model="email" placeholder="email" ref="emailInput">
    </div>
    <!-- 3. Username -->
    <div>
      <at-sign-icon></at-sign-icon>
      <input type="text" v-model="username" placeholder="username" ref="usernameInput">
    </div>
    <!-- 4. Password -->
    <div>
      <lock-icon></lock-icon>
      <input type="password" v-model="password" placeholder="password" ref="passwordInput">
    </div>
    <!-- Sign up -->
    <a v-on:click="signup">Sign up</a>
  </form>
</template>

<script src="./script.js"></script>
<style scoped lang="sass">

@import '../login/style.sass'

form > div > div input
  width: 6.25em

  &:first-child
    margin-right: .5em

</style>
