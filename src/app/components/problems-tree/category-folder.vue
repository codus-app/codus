<template>
  <div class="category-folder">
    <div class="top">
      <icon-chevron-right></icon-chevron-right>
      <icon-folder></icon-folder>

      <div class="name font-1 light">
        <slot name="name"></slot>
      </div>
    </div>

    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<script>

</script>

<style scoped lang="sass" src="./category-folder.sass"></style>
