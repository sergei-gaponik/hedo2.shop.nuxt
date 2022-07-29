<template>
  <svg
    :width="height + 'px'"
    :height="height + 'px'"
    focusable="false"
    :fill="color"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
  </svg>
</template>

<script>
export default {
  props: ["color", "height"],
};
</script>
