<template>
  <button class="a-button" @click="$emit('click')" type="button">
    <slot />
    <span v-if="caption" class="a-caption">{{ caption }}</span>
  </button>
</template>

<script>
import AddIcon from "~/components/icons/basic/AddIcon.vue";

export default {
  components: { AddIcon },
  props: {
    caption: String,
    minContent: Boolean,
  },
};
</script>

<style scoped>
.a-button {
  all: unset;
  cursor: pointer;
  user-select: none;
  height: var(--button-y);
  padding: 0 var(--button-padding-x);
  color: black;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: var(--gap);
  border-radius: var(--default-border-radius);
  white-space: nowrap;
}

.a-button:active {
  background-color: var(--c-gray-4);
}
</style>
