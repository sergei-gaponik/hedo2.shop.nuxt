<template>
  <div>
    <drawer-bottom-m :show="$store.state.nav.cartDrawerOpen">
      <add-to-cart-page />
    </drawer-bottom-m>
    <div class="a-button-container">
      <add-to-cart-button 
        @action="addToCart" 
        :maxQuantity="maxQuantity"
        :selectedVariant="selectedVariant"
      />
    </div>
    <product-image-gallery :images="product.images" />
    <div class="a-title mb2"> 
      <product-title :product="product" :fontSize=1.1 />
    </div>
    <!--<variant-selector 
      v-if="product.variants.length > 1" 
      :variants="product.variants" 
      :selected="variantIndex" 
      @selectionChanged="updateVariant" 
    />-->
    <p class="text">
      {{ `${$t("deliveryTime")}: ${$i18n.localeProperties.deliveryTime.join(" - ")} ${$t("days")}`}}
      </p>
    <payment-methods/>

    <h2 class="h2">{{ $t("similarProducts") }}</h2>
    <lazy-wrapper :loadingState="similarProductsLoadingState">
      <product-list-horizontal :products="similarProducts"/>
    </lazy-wrapper>
    <div class="a-mb"></div>
  </div>
</template>

<script>
import ProductListHorizontal from '~/components/pages/collection/ProductListHorizontal.vue'
import ProductImageGallery from '~/components/pages/product/ProductImageGallery.vue'
import ProductTitle from '~/components/pages/product/ProductTitle.vue'
import PaymentMethods from '~/components/pages/product/PaymentMethods.vue'
import VariantSelector from '~/components/pages/product/VariantSelector.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import instanceHandler from '~/core/instanceHandler'
import searchHandler from '~/core/searchHandler'
import { CartError, LoadingState } from '~/types'
import DrawerBottomM from '~/components/layout/drawer/DrawerBottomM.vue'
import AddToCartPage from './AddToCartPage.vue'
import AddToCartButton from '~/components/pages/product/AddToCartButton.vue'

export default {
  props: [ "product" ],
  components: { ProductTitle, LazyWrapper, ProductImageGallery, ProductListHorizontal, VariantSelector, PaymentMethods, DrawerBottomM, AddToCartPage, AddToCartButton },
  methods: {
    updateVariant(selectedIndex){
      this.variantIndex = selectedIndex
    },
    async addToCart(quantity){

      console.log(this.selectedVariant._id, this.product.variants.map(a => a._id))

      const variant = this.selectedVariant._id
      const product = this.product._id
      const price = this.selectedVariant.price
      const maxQuantity = this.maxQuantity

      const r = await this.$store.dispatch("cart/addToCart", { variant, product, quantity, price, maxQuantity })

      if(r == CartError.quantityNotAvailable)
        this.$store.dispatch("notifications/error", this.$t("quantityNotAvailable"))
      else if(r == CartError.error)
        this.$store.dispatch("notifications/error", this.$t("error"))
      else
        this.$store.commit("nav/openCartDrawer")

    }
  },
  async fetch(){

    const r = await searchHandler({
      path: "getProductsLikeThis",
      args: {
        _id: this.product._id,
        limit: 5
      }
    })

    if(r.loadingState != LoadingState.ready || !r.data?.products){
      this.similarProductsLoadingState = LoadingState.error
      return;
    }

    const ids = r.data.products.map(a => a._id)

    const r2 = await instanceHandler({
      path: "findProducts",
      args: { ids }
    })

    this.similarProductsLoadingState = r2.loadingState
    this.similarProducts = r2.data?.products || []
  },
  data(){
    return {
      similarProducts: null,
      similarProductsLoadingState: LoadingState.ready,
      variantIndex: 0
    }
  },
  computed: {
    selectedVariant(){
      return this.product.variants[this.variantIndex]
    },
    maxQuantity(){
      return Math.min(this.selectedVariant.availableQuantity, this.selectedVariant.maxQuantity || 100)
    }
  }
}
</script>

<style scoped>
.a-title {
  text-align: center;
  margin-top: 10px;
}
.a-button-container{
  position: fixed;
  bottom: calc(var(--footer-y-m) + var(--gap));
  z-index: 50;
  width: calc(100% - (var(--padding-x-m) * 2));
}
.a-mb{
  margin-bottom: calc(var(--gap) + var(--button-y));
}
</style>