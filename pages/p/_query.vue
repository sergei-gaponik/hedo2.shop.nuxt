<template>
<div class="container-m">
  <lazy-wrapper :loadingState="loadingState">
    <div v-if="!product">
      <span>{{ $t("productNotFound") }}</span>
    </div>
    <div v-else>
      <product-image-gallery :images="product.images" />
      <div class="a-title mb2"> 
        <product-title :product="product" :fontSize=1.1 />
      </div>
      <variant-selector 
        v-if="product.variants.length > 1" 
        :variants="product.variants" 
        :selected="variantIndex" 
        @selectionChanged="updateVariant" 
      />
      <p class="text">
        {{ `${$t("deliveryTime")}: ${$i18n.localeProperties.deliveryTime.join(" - ")} ${$t("days")}`}}
        </p>
      <payment-methods/>

      <h2 class="h2">{{ $t("similarProducts") }}</h2>
      <lazy-wrapper :loadingState="similarProductsLoadingState">
        <product-list-horizontal :products="similarProducts"/>
      </lazy-wrapper>

    </div>
  </lazy-wrapper>
</div>
</template>

<script>
import ProductListHorizontal from '~/components/collection/ProductListHorizontal.vue'
import ProductImageGallery from '~/components/product/ProductImageGallery.vue'
import ProductTitle from '~/components/product/ProductTitle.vue'
import PaymentMethods from '~/components/misc/PaymentMethods.vue'
import VariantSelector from '~/components/product/VariantSelector.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import instanceHandler from '~/core/instanceHandler'
import searchHandler from '~/core/searchHandler'
import { LoadingState } from '~/types'

export default {
  components: { ProductTitle, LazyWrapper, ProductImageGallery, ProductListHorizontal, VariantSelector, PaymentMethods },
  methods: {
    updateVariant(selectedIndex){
      this.variantIndex = selectedIndex
    }
  },
  async fetch(){
    this.loadingState = LoadingState.loading
    this.similarProductsLoadingState = LoadingState.loading

    const r = await instanceHandler({
      path: "findOneProduct",
      args: {
        query: this.$route.params.query
      }
    })

    this.loadingState = r.loadingState
    this.product = r.data?.product || null

    if(this.loadingState != LoadingState.ready || !this.product)
      return;

    const r2 = await searchHandler({
      path: "getProductsLikeThis",
      args: {
        _id: this.product._id,
        limit: 5
      }
    })

    if(r2.loadingState != LoadingState.ready || !r2.data?.products){
      this.similarProductsLoadingState = LoadingState.error
      return;
    }

    const ids = r2.data.products.map(a => a._id)

    const r3 = await instanceHandler({
      path: "findProducts",
      args: { ids }
    })

    this.similarProductsLoadingState = r3.loadingState
    this.similarProducts = r3.data?.products || []
  },
  data(){
    return {
      product: null,
      loadingState: LoadingState.ready,
      similarProducts: null,
      similarProductsLoadingState: LoadingState.ready,
      variantIndex: 0
    }
  }
}
</script>

<style scoped>
.a-title {
  text-align: center;
  margin-top: 10px;
}
</style>