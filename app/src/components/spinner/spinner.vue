<template>
  <div class="spinner" v-bind:style="{ borderWidth: `${lineWidth}px`, 'border-color': `transparent ${color} ${color}` }"></div>
</template>

<style scoped lang="sass" src="./style.sass"></style>

<script>
export default {
  props: {
    color: { type: String, default: 'white' },
    lineWidth: { type: Number, default: 2 }
  },
}
</script>
