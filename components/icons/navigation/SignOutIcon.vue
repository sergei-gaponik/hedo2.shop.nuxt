<template>
  <svg
    :width="height + 'px'"
    :height="height + 'px'"
    focusable="false"
    :fill="color"
    viewBox="0 0 24 24"
  >
    <g><path d="M0,0h24v24H0V0z" fill="none" /></g>
    <g>
      <path
        d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"
      />
    </g>
  </svg>
</template>

<script>
export default {
  props: ["color", "height"],
};
</script>
