<template>
  <primary-button 
    class="a-secondary"
    :action="action"
    :to="to"
    :submit="submit"
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
    minContent: Boolean
  }
}
</script>

<style scoped>
.a-secondary{
  color: var(--c-green-2) !important;
  background-color: white !important;
  border: var(--border-width) solid var(--c-green-3) !important;
}
</style>