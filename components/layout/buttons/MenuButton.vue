<template>
  <div @click="action" class="a-button">
    <menu-icon
      :color="color"
      :height="height"
      :style="{ padding: `${py}px ${px}px` }"
    />
  </div>
</template>

<script>
import MenuIcon from "~/components/icons/navigation/MenuIcon.vue";

export default {
  components: { MenuIcon },
  props: ["height", "color", "px", "py", "action"],
};
</script>

<style scoped>
.a-button {
  cursor: pointer;
}
</style>
