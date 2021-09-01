<template>
  <div class="a-flex">
    <button class="a-button" @click="$router.go(-1)" v-if="backButton">
      <chevron-left-icon height=36 color="var(--c-gray-3)" />
    </button>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
import ChevronLeftIcon from '~/components/icons/arrows/ChevronLeftIcon.vue'

export default {
  components: { ChevronLeftIcon },
  props: {
    title: String,
    backButton: Boolean
  },
}
</script>

<style scoped>
.a-flex{
  display: flex;
  gap: var(--gap);
}
.a-button {
  all: unset;
  cursor: pointer;
}
</style>
