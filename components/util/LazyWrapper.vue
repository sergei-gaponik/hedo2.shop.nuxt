<template>
  <div v-if="state=='loading'"></div>
  <div v-else-if="state=='error'">
    <div class="center mb2">
      <error-icon height=36 color="var(--c-gray-1)"/>
    </div>
    <div>{{ $t('error') }}</div>
  </div>
  <div v-else-if="state=='notFound'">
    <div>
      404
    </div>
  </div>
  <div v-else><slot /></div>
</template>

<script>
import ErrorIcon from '~/components/icons/status/ErrorIcon.vue'

export default {
  components: { ErrorIcon },
  props: ["loadingState"],
  computed: {
    state(){
      return this.loadingState || this.$store.state.loadingState.loadingState
    }
  }
}
</script>