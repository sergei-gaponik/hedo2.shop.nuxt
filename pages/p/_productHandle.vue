<template>
<div :class="$device.isMobile ? 'container-m' : 'container'">
  <bread-crumbs 
    :breadCrumbs="breadCrumbs"
    inline
  />
  <lazy-wrapper :loadingState="firstLoading">
    <product-page :product="product" class="mt2"/>
  </lazy-wrapper>
</div>
</template>

<script>
import ProductPage from '~/components/pages/product/ProductPage.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import instanceHandler from '~/core/instanceHandler'
import BreadCrumbs from '~/components/navigation/BreadCrumbs.vue'
import { LoadingState } from '~/types'

export default {
  components: { LazyWrapper, ProductPage, BreadCrumbs },
  async fetch(){
    this.firstLoading = LoadingState.loading
    this.$store.commit('loadingState/setLoadingState', LoadingState.loading)

    const r = await instanceHandler({
      path: "findOneProduct",
      args: {
        query: this.$route.params.productHandle
      },
      cache: true
    })

    this.product = r.data?.product || null

    if(!this.product){
      this.firstLoading = LoadingState.notFound
      return;
    }

    if(this.product.series){

      const r2 = await instanceHandler({
        path: "getOneSeries",
        args: { handle: this.product.series.handle },
        cache: true
      })
  
      const seriesInfo = r2.data?.series
  
      if(!seriesInfo) return;
  
      this.breadCrumbs = [
        {
          caption: this.$t("allProducts"),
          href: this.localePath("/c/all")
        },
        {
          caption: seriesInfo.brand.name,
          href: this.localePath(`/b/${seriesInfo.brand.handle}`)
        },
        {
          caption: seriesInfo.name,
          href: this.localePath(`/s/${seriesInfo.handle}`)
        }
      ]
    }
    else{ 
      const r2 = await instanceHandler({
        path: "getBrand",
        args: { handle: this.product.brand.handle },
        cache: true
      })
  
      const brandInfo = r2.data?.brand

      if(!brandInfo) return;
  
      this.breadCrumbs = [
        {
          caption: this.$t("allProducts"),
          href: this.localePath("/c/all")
        },
        {
          caption: brandInfo.name,
          href: this.localePath(`/b/${brandInfo.handle}`)
        }
      ]
    }
    this.firstLoading = LoadingState.ready

  },
  data(){
    
    return {
      product: null,
      breadCrumbs: [],
      firstLoading: LoadingState.ready
    }
  }
}
</script>
