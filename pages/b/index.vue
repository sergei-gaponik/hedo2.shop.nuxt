<template>
  <brands-page :brands="brands" />
</template>

<script>
import PageTitleM from '~/components/layout/header/PageTitleM.vue'
import { LoadingState } from '~/types'
import instanceHandler from '~/core/instanceHandler'
import BrandsPage from '~/components/pages/brands/BrandsPage.vue'

export default {
  components: { PageTitleM, BrandsPage },
  data(){
    return { 
      brands: []
    }
  },
  async fetch(){
    
    this.$store.commit('loadingState/setLoadingState', LoadingState.loading)

    const { data } = await instanceHandler({
      path: "getBrands",
      cache: true
    })

    this.brands = data?.brands

    this.$store.commit('loadingState/setLoadingState', LoadingState.ready)

  }
}
</script>