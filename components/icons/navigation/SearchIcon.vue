<template>
  <!-- <svg :width="height + 'px'" :height="height + 'px'" focusable="false" :fill="color" viewBox="0 0 24 24">
    <path d="m23.03 21.97-7.164-7.164A8.969 8.969 0 0 0 18 9a9 9 0 1 0-9 9 8.969 8.969 0 0 0 5.806-2.134l7.164 7.164a.748.748 0 0 0 1.06 0 .75.75 0 0 0 0-1.06zM1.5 9A7.5 7.5 0 0 1 9 1.5 7.509 7.509 0 0 1 16.5 9a7.5 7.5 0 1 1-15 0z"></path>
    </svg> -->

  <svg :width="height + 'px'" :height="height + 'px'" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="13.5" cy="13.5" r="12" :stroke="color" stroke-width="2"/>
<path d="M23 23L34 34" :stroke="color" stroke-width="2" stroke-linecap="round"/>
</svg>
</template>

<script>
export default {
  props: ["color", "height"]
}
</script>
