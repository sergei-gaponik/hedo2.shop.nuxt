<template>
  <button type="button" class="a-button" @click="action">
    <span class="a-caption">{{ $t("filter") }}</span>
    <filter-icon height="16" color="var(--c-gray-1)" />
  </button>
</template>

<script>
import FilterIcon from "~/components/icons/basic/FilterIcon.vue";

export default {
  components: { FilterIcon },
  props: ["action"],
};
</script>

<style scoped>
.a-button {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid var(--c-gray-2);
  border-radius: var(--border-width);
  padding: var(--padding-s) var(--padding-s);
}
.a-caption {
  padding: 0 var(--padding);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing);
  font-size: 0.8em;
}
</style>
