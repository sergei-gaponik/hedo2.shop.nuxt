<template>
  <div @click="action">
    <search-icon color="#434343" :height="height" />
  </div>
</template>

<script>
import SearchIcon from '~/components/icons/navigation/SearchIcon.vue'

export default {
  components: { SearchIcon },
  props: ["height", "action"]
}
</script>