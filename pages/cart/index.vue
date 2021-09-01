<template>
  <div class="container-m">
    <page-title-m :title="$t('cartPageTitle')" />
    <lazy-wrapper :loadingState="loadingState">
      <cart-page 
        :products="products"
        :variants="variants"
        @fetch="_fetch"
      />
    </lazy-wrapper>
  </div>
</template>

<script lang="ts">
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import instanceHandler from '~/core/instanceHandler'
import CartPage from '~/components/pages/cart/CartPage.vue'
import { LoadingState } from '~/types'
import PageTitleM from '~/components/layout/header/PageTitleM.vue'

export default {
  components: { CartPage, LazyWrapper, PageTitleM },
  methods: {
    _fetch() {
      this.$fetch()
    }
  },
  fetchOnServer: false,
  async fetch(){
    this.loadingState = LoadingState.loading

    this.$store.commit("cart/init")

    const lineItems = this.$store.state.cart.lineItems

    const cartItems = lineItems.map(a => ({ 
      product: a.product, 
      variant: a.variant
    }))

    if(cartItems.length){
      
      const r2 = await instanceHandler({ path: 'findCartItems', args: { cartItems } })

      this.loadingState = r2.loadingState
      this.variants = r2.data?.variants || []
      this.products = r2.data?.products || []

      this.$store.commit("cart/updateAvailableQuantities", this.variants)
    }
    else{ 

      this.loadingState = LoadingState.ready
    }

  },
  data() {
    return { 
      variants: [],
      products: [],
      loadingState: LoadingState.loading
    }
  },
}
</script>