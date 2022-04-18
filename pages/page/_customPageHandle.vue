<template>
  <lazy-wrapper :loadingState="loadingState">
    <div v-if="customPage" :class="$device.isMobile ? 'container-m' : 'container-slim-d'">
      <h1>{{ customPage.title }}</h1>
      <div v-html="customPage.body"></div>
    </div>
  </lazy-wrapper>
</template>

<script>
import instanceHandler from '~/core/instanceHandler'
import { LoadingState } from '~/types'
import LazyWrapper from '~/components/util/LazyWrapper.vue'

export default {
  components: { LazyWrapper },
  async fetch(){

    const handle = this.$route.params.customPageHandle

    this.loadingState = LoadingState.loading

    const r = await instanceHandler({
      path: "getCustomPage",
      args: { handle }
    })

    this.loadingState = r.loadingState
    this.customPage = r.data.customPage
  },
  data(){
    return {
      customPage: null,
      loadingState: LoadingState.ready
    }
  }
}
</script>