<template>
<div class="container-m">
  <bread-crumbs 
    :breadCrumbs="breadCrumbs"
    inline
  />
  <lazy-wrapper :loadingState="loadingState">
    <div v-if="!product">
      <span>{{ $t("productNotFound") }}</span>
    </div>
    <product-page v-else :product="product"/>
    
  </lazy-wrapper>
</div>
</template>

<script>
import ProductPage from '~/components/pages/product/ProductPage.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import instanceHandler from '~/core/instanceHandler'
import BreadCrumbs from '~/components/navigation/BreadCrumbs.vue'
import searchHandler from '~/core/searchHandler'
import { LoadingState } from '~/types'

export default {
  components: { LazyWrapper, ProductPage, BreadCrumbs },
  async fetch(){
    this.loadingState = LoadingState.loading
    this.similarProductsLoadingState = LoadingState.loading

    const r = await instanceHandler({
      path: "findOneProduct",
      args: {
        query: this.$route.params.productHandle
      }
    })

    this.loadingState = r.loadingState
    this.product = r.data?.product || null

    if(this.product.series){

      const r2 = await instanceHandler({
        path: "getOneSeries",
        args: { handle: this.product.series.handle }
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
        args: { handle: this.product.brand.handle }
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


  },
  data(){
    
    return {
      product: null,
      loadingState: LoadingState.ready,
      breadCrumbs: []
    }
  }
}
</script>
