<template>
  <div>
    <div v-if="!orders.length">
      {{ $t('noOrders') }}
    </div>

  </div>
</template>

<script>
import { getIdToken } from '~/util/auth'
import { LoadingState } from '~/types'
import instanceHandler from '~/core/instanceHandler'

export default {
  
  async fetch(){

    this.$store.commit("loadingState/isLoading")

    const idToken = await getIdToken()

    const r = await instanceHandler({
      path: "getUserOrders",
      args: { idToken },
      cache: true
    })

    console.log(r)
    this.$store.commit("loadingState/isReady")

  },
  data(){
    return {
      orders: []
    }
  }
}
</script>

<style scoped>

</style>