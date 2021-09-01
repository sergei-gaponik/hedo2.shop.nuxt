<template>
  <div 
    type="button"
    :class="['a-filter', !last ? 'a-filter-divider' : '']"
    @click="$emit('input', !selected)"
  >
    <div>
      {{ filter.title }}
    </div>
    <check-box 
      :checked="selected"
    />
  </div>
</template>

<script>
import CheckBox from '~/components/layout/inputs/CheckBox.vue'

export default {
  model: {
    prop: 'selected',
    event: 'input'
  },
  components: { CheckBox },
  props: {
    filter: Object,
    last: Boolean,
    selected: Boolean
  }
}
</script>

<style scoped>
.a-filter{
  all: unset;
  display: flex;
  justify-content: space-between;
  padding: 0 calc(var(--padding) * 1.5);
  align-items: center;
  height: var(--list-item-y);
}

.a-filter-divider{
  border-bottom: 1px solid var(--c-gray-3);
}
</style>