<template>
  <div class="list-item" @click="$emit('click')">
    <div>{{ caption }}</div>
    <chevron-right-icon height=16 color="var(--c-gray-2)" />
  </div>
</template>

<script>
export default {
  props: [ "caption" ]
}
</script>

<style scoped>

</style>