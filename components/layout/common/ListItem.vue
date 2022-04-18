<template>
  <div :class="[
    'list-item',
    noPadding ? 'a-nopadding' : '',
    noBorder ? 'a-noborder' : ''
  ]" @click="$emit('click')">
    <div>{{ caption }}</div>
    <chevron-right-icon height=16 color="var(--c-gray-2)" />
  </div>
</template>

<script>
import ChevronRightIcon from '~/components/icons/arrows/ChevronRightIcon.vue'

export default {
  components: { ChevronRightIcon },
  props: {
    caption: String,
    noPadding: Boolean,
    noBorder: Boolean
  }
}
</script>

<style scoped>
.a-nopadding{
  padding: 0;
}
.a-noborder{
  border: none;
}
</style>