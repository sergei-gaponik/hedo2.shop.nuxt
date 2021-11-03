<template>
  <primary-button 
    :class="deleteButton ? 'a-delete' : 'a-secondary'"
    :action="action"
    :to="to"
    :submit="submit"
    :minContent="minContent"
    @click="$emit('click')"
  >
    <slot />
  </primary-button>
</template>

<script>
import PrimaryButton from './PrimaryButton.vue'
export default {
  components: { PrimaryButton },
  props: {
    action: Function,
    to: String,
    submit: Boolean,
    minContent: Boolean,
    deleteButton: Boolean
  }
}
</script>

<style scoped>
.a-secondary{
  color: var(--c-green-2) !important;
  background-color: white !important;
  border: var(--border-width) solid var(--c-green-3) !important;
}
.a-delete{
  color: var(--c-red-1) !important;
  background-color: white !important;
  border: var(--border-width) solid var(--c-red-2) !important;
}
</style>