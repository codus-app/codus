<template>
  <div class="editor">
    <span class="code bold">Category:&nbsp;</span><span class="code light">{{ $route.params.category }}</span>
    <br/>
    <span class="code bold">Problem:&nbsp;&nbsp;</span><span class="code light">{{ $route.params.name }}</span>
  </div>
</template>

<script> export default {}; </script>

<style scoped lang="sass">
.editor
  padding: 2em
  font-family: Montserrat

.title
  font-family:
</style>
