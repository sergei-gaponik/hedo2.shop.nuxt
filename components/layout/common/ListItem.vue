<template>
  <div class="list-item" @click="$emit('click')">
    <div>{{ caption }}</div>
    <chevron-right-icon height=16 color="var(--c-gray-2)" />
  </div>
</template>

<script>
import ChevronRightIcon from '~/components/icons/arrows/ChevronRightIcon.vue'

export default {
  components: { ChevronRightIcon },
  props: [ "caption" ]
}
</script>

<style scoped>

</style>