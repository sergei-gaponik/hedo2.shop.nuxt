<template>
  <svg
    :width="height + 'px'"
    :height="height + 'px'"
    focusable="false"
    :fill="color"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" />
  </svg>
</template>

<script>
export default {
  props: ["color", "height"],
};
</script>
