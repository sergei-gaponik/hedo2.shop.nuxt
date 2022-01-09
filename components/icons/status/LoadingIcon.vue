<template>
<svg style="margin: auto; background: rgb(255, 255, 255, 0) none repeat scroll 0% 0%; display: block; shape-rendering: auto;" :width="height + 'px'" :height="height + 'px'" focusable="false" viewBox="0 0 100 100">
<circle cx="50" cy="50" fill="none" :stroke="color" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
</circle></svg>
</template>

<script>
export default {
  props: ["color", "height"]
}
</script>