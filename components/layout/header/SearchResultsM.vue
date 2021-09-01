<template>
  <client-only>
    <lazy-wrapper :loadingState="loadingState">
    <div class="container-m">
      <product-list-horizontal :products="products" loadingState="ready" />
      <nuxt-link 
        v-if="loadingState == 'ready' && products.length"
        :to="localePath('/q/'+$store.state.search.query)" 
        @click.native="$store.commit('search/reset')">
        <div class="link-h4">{{ $t('moreResults') }}</div>
      </nuxt-link>
    </div>
    </lazy-wrapper>
  </client-only>
</template>

<script>
import ProductCard from '~/components/pages/collection/ProductCard.vue'
import ProductListHorizontal from '~/components/pages/collection/ProductListHorizontal.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import instanceHandler from '~/core/instanceHandler'
import { LoadingState } from '~/types'

export default {
  components: { LazyWrapper, ProductCard, ProductListHorizontal },
  async fetch() {

    this.loadingState = LoadingState.loading

    const ids = this.$store.state.search.productResults

    if(!ids.length) {
      this.loadingState = LoadingState.ready
      this.products = []
      return;
    }

    const res = await instanceHandler({
      path: "findProducts",
      args: { ids }
    })

    this.loadingState = res.loadingState
    this.products = res.data?.products || []
  },
  data: () => ({
    products: [],
    loadingState: LoadingState.ready
  }),
  watch: {
    '$store.state.search.productResults': function(){
      this.$fetch()
    }
  }
}
</script>

<style scoped>

</style>