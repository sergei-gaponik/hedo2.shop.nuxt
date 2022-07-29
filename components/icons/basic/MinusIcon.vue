<template>
  <svg
    :width="height + 'px'"
    :height="height + 'px'"
    focusable="false"
    :fill="color"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M19 13H5v-2h14v2z" />
  </svg>
</template>

<script>
export default {
  props: ["color", "height"],
};
</script>
