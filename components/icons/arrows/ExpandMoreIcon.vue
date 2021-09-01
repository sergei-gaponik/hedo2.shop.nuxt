<template>
  <svg :width="height + 'px'" :height="height + 'px'" focusable="false" :fill="color" viewBox="0 0 24 24">
    <path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/>
  </svg>
</template>

<script>
export default {
  props: ["color", "height"]
}
</script>