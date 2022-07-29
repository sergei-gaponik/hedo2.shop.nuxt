<template>
  <div
    type="button"
    :class="[
      'a-filter',
      !last && !noBorder ? 'a-filter-divider' : '',
      noPadding ? 'a-nopadding' : '',
      disabled ? 'a-disabled' : '',
    ]"
    @click="$emit('input', !selected)"
  >
    <div>
      {{ filter.title }}
    </div>
    <check-box fakeCheckbox :checked="selected" :disabled="disabled" />
  </div>
</template>

<script>
import CheckBox from "~/components/layout/inputs/CheckBox.vue";

export default {
  model: {
    prop: "selected",
    event: "input",
  },
  components: { CheckBox },
  props: {
    filter: Object,
    last: Boolean,
    selected: Boolean,
    noBorder: Boolean,
    noPadding: Boolean,
    disabled: Boolean,
  },
};
</script>

<style scoped>
.a-filter {
  all: unset;
  display: flex;
  justify-content: space-between;
  padding: 0 calc(var(--padding) * 1.5);
  align-items: center;
  height: var(--list-item-y);
  cursor: pointer;
}

.a-nopadding {
  padding: 0;
}

.a-filter-divider {
  border-bottom: 1px solid var(--c-gray-3);
}

.a-disabled {
  color: var(--c-gray-2);
  cursor: initial;
}
</style>
