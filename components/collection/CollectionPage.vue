<template>
  <div>
    <filter-section />
    <lazy-wrapper :loadingState="loadingState">
      <div v-if="loadingState == 'ready' && !products.length">
        {{ $t("noResults") }}
      </div>
      <div v-else>
        <product-grid :products="products"/>
      </div>
    </lazy-wrapper>
  </div>
</template>


<script>
import searchHandler from '~/core/searchHandler'
import { LoadingState } from '~/types'
import ProductGrid from '~/components/collection/ProductGrid.vue'
import instanceHandler from '~/core/instanceHandler'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import FilterSection from '~/components/collection/FilterSection.vue'

const getProperties = products => {

  let hash = {};

  for(const product of products){

    if(!product.fields) continue;
    
    const properties = product.fields.properties
    for (let i = 0; i < properties.length; i++) {
      hash[properties[i]] = true;
    }
  }

  return Object.keys(hash)
}

export default {
  components: { ProductGrid, LazyWrapper, FilterSection },
  props: [ "filters", "series", "brand", "collection", "query" ],
  data(){
    return {
      loadingState: LoadingState.ready,
      products: []
    }
  },
  async fetch() {

    this.loadingState = LoadingState.loading

    const r = await searchHandler({
      path: "getProductSearchResults",
      args: {
        query: this.query,
        limit: 24,
        page: 1
      }
    })

    if(r.loadingState != LoadingState.ready || !r.data?.products){
      this.loadingState = LoadingState.error
      return;
    }

    const ids = r.data.products.map(a => a._id)

    const properties = getProperties(r.data.products)

    const r2 = await instanceHandler({
      path: "findProducts",
      args: { ids }
    })

    this.loadingState = r2.loadingState
    this.products = r2.data?.products || []

    const r3 = await instanceHandler({
      path: "getFilters",
      args: { properties }
    })

  }
}
</script>