<template>
  <div class="editor">
    <span class="code bold">Category:&nbsp;</span><span class="code light">
      {{ $route.params.category }}
    </span>
    <br/>
    <span class="code bold">Problem:&nbsp;&nbsp;</span><span class="code light">
      {{ $route.params.name }}
    </span>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
