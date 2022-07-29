<template>
  <div
    type="button"
    :class="['a-category', !last ? 'a-category-divider' : '']"
    @click="$emit('click')"
  >
    <div class="a-caption">
      {{ category.name }}
    </div>
    <chevron-right-icon height="16" color="var(--c-gray-1)" />
  </div>
</template>

<script>
import ChevronRightIcon from "~/components/icons/arrows/ChevronRightIcon.vue";

export default {
  components: { ChevronRightIcon },
  props: {
    category: Object,
    last: Boolean,
  },
};
</script>

<style scoped>
.a-category {
  all: unset;
  display: flex;
  justify-content: space-between;
  padding: 0 calc(var(--padding) * 1.5);
  align-items: center;
  height: var(--list-item-y);
}

.a-category-divider {
  border-bottom: 1px solid var(--c-gray-3);
}

.a-caption {
  font-weight: 600;
}
</style>
