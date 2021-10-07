<template>
  <div @click="action">
    <cross-icon color="var(--c-gray-1)" :height="height" />
  </div>
</template>

<script>
import CrossIcon from '~/components/icons/basic/CrossIcon.vue'

export default {
  components: { CrossIcon },
  props: ["height", "action"]
}
</script>