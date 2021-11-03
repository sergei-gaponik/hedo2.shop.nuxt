<template>
  <div>
      <filter-section 
        :productCount="ids.length"
      />
    <lazy-wrapper>
      <div v-if="$store.state.loadingState.loadingState == 'ready' && !products.length">
        {{ $t("noResults") }}
      </div>
      <div v-else>
        <product-grid :products="products" class="mb2" :cols="cols" />
        <collection-pagination 
          :page="page"
          :totalPages="totalPages"
          :limit="limit"
          @nextPage="nextPage"
          @prevPage="prevPage"
          @setLimit="setLimit"
        />
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
import { GLOBAL } from '~/core/const'

const getAppliedFilters = urlParams => Object.values(urlParams).map(a => a.split("_"))

export default {
  components: { ProductGrid, LazyWrapper, FilterSection, CollectionPagination },
  props: [ "series", "brand", "filters", "query" ],
  data(){
    return {
      loadingState: LoadingState.ready,
      products: [],
      page: 1,
      limit: GLOBAL.defaultPaginationLimit,
      ids: []
    }
  },
  computed: {
    totalPages(){
      return Math.ceil(this.ids.length / this.limit)
    },
    cols(){
      if(this.$device.isMobile)
        return 2
      else if(this.$device.isTablet)
        return 3
      else
        return 4
    }
  },
  methods: {
    nextPage(){
      if(this.page < this.totalPages) this.page++;
    },
    prevPage(){
      if(this.page > 1) this.page--;
    },
    setLimit(limit){
      this.limit = limit
    }
  },
  async fetch() {

    if(process.client)  
      window.scrollTo(0, 0)

    this.$store.commit('loadingState/setLoadingState', LoadingState.loading)
    this.$store.commit('filters/setAppliedFilters', getAppliedFilters(this.$route.query) || [])

    const appliedFilters = this.$store.state.filters.appliedFilters
    const filters = [ ...appliedFilters, ...(this.filters || [])]

    const r = await searchHandler({
      path: "getProductSearchResults",
      args: {
        query: this.query,
        series: this.series,
        brand: this.brand,
        filters
      },
      cache: true
    })

    if(r.loadingState != LoadingState.ready || !r.data?.ids){
      this.$store.commit('loadingState/setLoadingState', LoadingState.error)
      return;
    }

    const ids = r.data.ids
    const properties = r.data.properties

    this.ids = ids

    const { page, limit } = this

    const r2 = await instanceHandler({
      path: "findProducts",
      args: { ids, page, limit },
      cache: true
    })

    this.loadingState = r2.loadingState
    this.products = r2.data?.products || []

    const { data } = await instanceHandler({
      path: "getFilters",
      args: { properties, appliedFilters },
      cache: true
    })

    this.$store.commit("filters/setAvailableCategories", data?.filterCategories || [])
    this.$store.commit("filters/setAppliedFilterTags", data?.appliedFilters || [])

    this.$store.commit('loadingState/setLoadingState', LoadingState.ready)
  },
  watch: {
    '$route.query': function(){
      this.page = 1
      this.limit = GLOBAL.defaultPaginationLimit
      this.$store.commit('nav/closeAllDrawers')
      this.$store.commit('search/reset')
      this.$store.commit('filters/setAppliedFilters', getAppliedFilters(this.$route.query) || [])

      this.$fetch()
    },
    'limit': function(){
      this.$store.commit('nav/closeAllDrawers')
      this.$store.commit('search/reset')

      this.$fetch()
    },
    'page': function(){
      this.$store.commit('nav/closeAllDrawers')
      this.$store.commit('search/reset')

      this.$fetch()
    }
  }
}
</script>