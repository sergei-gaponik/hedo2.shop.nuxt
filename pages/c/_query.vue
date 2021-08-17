<template>
  <div class="container-m">
    <p>{{ query }}</p>
    <lazy-wrapper :loadingState="loadingState">
      <product-card v-for="product in products" :product="product" :key="product._id" />
    </lazy-wrapper>
    <button @click="$fetch">Refresh</button>
  </div>
</template>

<script>
import ProductCard from '~/components/collection/ProductCard.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import { LoadingState } from '~/types'
import instanceHandler from '~/core/instanceHandler'

export default {
  components: { ProductCard, LazyWrapper },
  async fetch(){

    this.loadingState = LoadingState.loading
    const ids = ["60f49be02dfadd66a8167d23"]
  
    const res = await instanceHandler({ 
      path: "findProducts",
      args: {
        ids
      }
    })

    this.loadingState = res.loadingState
    this.products = res.data?.products || []
    console.log(res)
  },
  data: () => ({
    products: [],
    loadingState: LoadingState.loading
  })
}
</script>
