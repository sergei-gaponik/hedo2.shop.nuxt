<template>
  <div class="container-m">
    <bread-crumbs 
      :breadCrumbs="breadCrumbs"
    />
    <brands-page :brands="brands" />
  </div>
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
      breadCrumbs: [],
      brands: []
    }
  },
  async fetch(){
    
    this.$store.commit('loadingState/setLoadingState', LoadingState.loading)

    const { data } = await instanceHandler({
      path: "getBrands",
      cache: true
    })

    this.$store.commit('loadingState/setLoadingState', LoadingState.ready)
    
    this.brands = data?.brands

    if(this.brands){
      
      this.breadCrumbs = [
        {
          caption: this.$t("allProducts"),
          href: this.localePath("/c/all")
        },
        {
          caption: this.$t("brands")
        }
      ]
    }
  }
}
</script>