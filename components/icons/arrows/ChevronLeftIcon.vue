<template>
  <svg :width="height + 'px'" :height="height + 'px'" focusable="false" :fill="color" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/></svg>
</template>

<script>
export default {
  props: ["color", "height"]
}
</script>