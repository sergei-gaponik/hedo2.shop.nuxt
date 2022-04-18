<template>
  <div>
    <div v-if="$device.isMobile">
      <div class="main-button-m">
        <add-to-cart-button 
          @action="addToCart" 
          :maxQuantity="maxQuantity"
          :selectedVariant="selectedVariant"
        />
      </div>
      <drawer-bottom-m :show="$store.state.nav.cartDrawerOpen">
        <add-to-cart-page 
          :product="product"
          :variant="selectedVariant"
        />
      </drawer-bottom-m>
    </div>
    <div :class="containerClass">
      <div v-if="!$device.isMobile" class="td-split-sticky">
        <portal to="body">
          <pop-up :show="$store.state.nav.cartDrawerOpen" width="480px" height="600px">
            <add-to-cart-page 
              :product="product"
              :variant="selectedVariant"
            />
          </pop-up>
        </portal>
        <product-image-gallery :images="images" />
        <lazy-wrapper :loadingState="similarProductsLoadingState">
          <div v-if="similarProducts && similarProducts.length">
            <h2 class="h2">{{ $t("similarProducts") }}</h2>
            <product-list-horizontal :products="similarProducts" :cols="$device.isDesktop ? 3 : 2" />
          </div>
        </lazy-wrapper>
      </div>
      <div :class="$device.isMobile ? '' : 'td-split-sticky'">
        <product-image-gallery v-if="$device.isMobile" :images="images" />
        <div class="a-title mb2"> 
          <product-title 
            :product="product" 
            :fontSize=1.1 
            :infoTagBottom="!$device.isMobile" 
            :selectedVariant="selectedVariant"
          />
        </div>
        <p class="text">
          {{ `${$t("deliveryTime")}: ${$i18n.localeProperties.deliveryTime.join(" - ")} ${$t("days")}`}}<br/>
        </p>
        <variant-selector 
          v-if="product.variants.length > 1" 
          :variants="product.variants" 
          v-model="variantIndex"
          class="mb4 mt4"
        />
        <add-to-cart-button 
          v-if="!$device.isMobile"
          @action="addToCart" 
          :maxQuantity="maxQuantity"
          :selectedVariant="selectedVariant"
          class="mt4"
        />
        <payment-methods class="mt4 mb2" />
        <benefits />

        <lazy-wrapper :loadingState="similarProductsLoadingState" v-if="$device.isMobile">
          <div v-if="similarProducts && similarProducts.length">
            <h2 class="h2">{{ $t("similarProducts") }}</h2>
            <product-list-horizontal :products="similarProducts" />
          </div>
        </lazy-wrapper>
      </div>
    </div>
    
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
import PopUp from '~/components/layout/misc/PopUp.vue'
import ProductGrid from '../collection/ProductGrid.vue'
import Benefits from './Benefits.vue'

export default {
  props: [ "product" ],
  components: { PopUp, ProductTitle, LazyWrapper, ProductImageGallery, ProductListHorizontal, VariantSelector, PaymentMethods, DrawerBottomM, AddToCartPage, AddToCartButton, ProductGrid, Benefits },
  methods: {
    async addToCart(quantity){

      const variant = this.selectedVariant._id
      const product = this.product._id
      const price = this.selectedVariant.price
      const maxQuantity = this.maxQuantity
      const specialTaxRate = this.selectedVariant.specialTaxRate

      this.$store.commit("loadingState/setLoadingState", LoadingState.loading)

      const r = await this.$store.dispatch("cart/addToCart", { variant, product, quantity, price, maxQuantity, specialTaxRate })

      this.$store.commit("loadingState/setLoadingState", LoadingState.ready)

      if(r == CartError.quantityNotAvailable){
        this.$store.dispatch("notifications/error", this.$t("quantityNotAvailable"))
      }
      else if(r == CartError.error){
        this.$store.dispatch("notifications/error", this.$t("error"))
      }
      else{
        this.$store.commit('search/reset')
        this.$store.commit("nav/openCartDrawer")
      }

    }
  },
  async fetch(){

    this.$store.commit('loadingState/setLoadingState', LoadingState.loading)
    this.similarProductsLoadingState = LoadingState.loading

    const limit = this.$device.isDesktop ? 6 : 5

    const r = await searchHandler({
      path: "getProductsLikeThis",
      args: {
        _id: this.product._id,
        limit: limit
      },
      cache: true
    })

    if(r.loadingState != LoadingState.ready || !r.data?.products){
      this.similarProductsLoadingState = LoadingState.error
      return;
    }

    const ids = r.data.products.map(a => a._id)

    const r2 = await instanceHandler({
      path: "findProducts",
      args: { ids },
      cache: true
    })

    this.$store.commit('loadingState/setLoadingState', LoadingState.ready)
    this.similarProductsLoadingState = LoadingState.ready
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
    images(){
      return this.selectedVariant.images || this.product.images
    },
    selectedVariant(){
      return this.product.variants[this.variantIndex]
    },
    maxQuantity(){
      return Math.min(this.selectedVariant.availableQuantity, this.selectedVariant.maxQuantity || 99)
    },
    eanCaption(){
      return this.selectedVariant.ean ? `EAN: ${this.selectedVariant.ean}` : ''
    },
    containerClass(){
      if(this.$device.isMobile)
        return ''
      else if(this.$device.isTablet)
        return 'td-split'
      else
        return 'td-split-3-2'
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