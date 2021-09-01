<template>
  <div>
    <lazy-wrapper :loadingState="loadingState">
      <div v-if="loadingState == 'ready' && !products.length">
        {{ $t("noResults") }}
      </div>
      <div v-else>
        <filter-section 
          :productCount="products.length"
        />
        <product-grid :products="products"/>
        <collection-pagination />
      </div>
    </lazy-wrapper>
  </div>
</template>


<script>
import searchHandler from '~/core/searchHandler'
import { LoadingState } from '~/types'
import ProductGrid from '~/components/pages/collection/ProductGrid.vue'
import instanceHandler from '~/core/instanceHandler'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import FilterSection from '~/components/pages/collection/filters/FilterSection.vue'
import CollectionPagination from './CollectionPagination.vue'

const getAppliedFilters = urlParams => Object.values(urlParams).map(a => a.split("_"))

export default {
  components: { ProductGrid, LazyWrapper, FilterSection, CollectionPagination },
  props: [ "series", "brand", "collection", "query" ],
  data(){
    return {
      loadingState: LoadingState.ready,
      products: [],
      page: 1,
      limit: 24
    }
  },
  async fetch() {

    this.loadingState = LoadingState.loading
    this.$store.commit('filters/setAppliedFilters', getAppliedFilters(this.$route.query) || [])

    const appliedFilters = this.$store.state.filters.appliedFilters

    const r = await searchHandler({
      path: "getProductSearchResults",
      args: {
        query: this.query,
        series: this.series,
        brand: this.brand,
        collection: this.collection,
        filters: appliedFilters
      }
    })

    if(r.loadingState != LoadingState.ready || !r.data?.ids){
      this.loadingState = LoadingState.error
      return;
    }

    const ids = r.data.ids
    const properties = r.data.properties

    const { page, limit } = this

    const r2 = await instanceHandler({
      path: "findProducts",
      args: { ids, page, limit }
    })

    this.loadingState = r2.loadingState
    this.products = r2.data?.products || []

    this.$store.commit("filters/setLoadingState", LoadingState.loading)

    const { data, loadingState } = await instanceHandler({
      path: "getFilters",
      args: { properties, appliedFilters }
    })

    this.$store.commit("filters/setAvailableCategories", data?.filterCategories || [])
    this.$store.commit("filters/setAppliedFilterTags", data?.appliedFilters || [])
    this.$store.commit("filters/setLoadingState", loadingState)


  },
  watch: {
    '$route.query': function(){
      this.$store.commit('nav/closeAllDrawers')
      this.$store.commit('filters/setAppliedFilters', getAppliedFilters(this.$route.query) || [])
      this.$fetch()
    },
    'limit': function(){
      this.$store.commit('nav/closeAllDrawers')
      this.$fetch()
    },
    'page': function(){
      this.$store.commit('nav/closeAllDrawers')
      this.$fetch()
    }
  }
}
</script>