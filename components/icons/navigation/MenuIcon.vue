<template>
  <svg
    :width="height + 'px'"
    :height="height + 'px'"
    focusable="false"
    :fill="color"
    viewBox="0 0 24 24"
  >
    <title>Menü</title>
    <path
      d="M.75 2.25h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zM23.25 21.75H.75a.75.75 0 0 0 0 1.5h22.5a.75.75 0 0 0 0-1.5zM.75 12.75h12a.75.75 0 0 0 0-1.5h-12a.75.75 0 0 0 0 1.5z"
    ></path>
  </svg>
</template>

<script>
export default {
  props: ["color", "height"],
};
</script>
