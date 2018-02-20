<template>
  <div class="editor">
    <span class="montserrat medium">{{ category }} /</span>
    <span class="montserrat extralight">{{ problemName }}</span>

    <pre class="code light">
{{ JSON.stringify(problem, null, '  ') }}
    </pre>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
