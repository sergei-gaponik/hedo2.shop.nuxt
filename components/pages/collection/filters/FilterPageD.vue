<template>
  <div class="a-sidebar" 
    @focusout="unsetCategory()"
    tabindex="0"
  >
    <div v-if="!selectedCategory">
      <price-filter 
        @change="a => priceRangeChange(a)"
      />
      <side-menu-item 
        v-if="brandMenu"
        :key="brandMenu.handle"
        :menuItem="brandMenu"
        :expanded="expanded"
        @expand="expand(brandMenu.handle)"
        @collapse="collapse(brandMenu.handle)"
        showAll
        noPadding
        noBorder
      >
        <side-menu-sub-item 
          v-for="child in brandMenu.children" 
          :key="child.handle" 
          :menuItem="child" 
          @click="$router.push('/s/' + child.handle)"
        />
      </side-menu-item>
      <list-item 
        v-for="item in menuItems"
        :key="item.handle"
        :caption="item.title"
        noPadding
        noBorder
        @click="selectCategory(item._id)"
      />
    </div>
    <div v-else>
      <div 
        class="a-filters-header"
        @click="unsetCategory()"
      >
        <chevron-left-icon height=16 color="var(--c-gray-1)" />
        <div>{{ selectedCategory.name }}</div>
        <div style="width:16px" />
      </div>
      <filter-m 
        v-for="filter in availableFilters"
        :key="filter._id"
        :filter="filter"
        :selected="selectedFilters.includes(filter.handle)"
        @input="v => setFilterSelected(filter.handle, v)"
        noBorder
        noPadding
      />
    </div>
  </div>
</template>

<script>
import instanceHandler from '~/core/instanceHandler'
import { LoadingState } from '~/types'
import SideMenuItem from '~/components/navigation/menu/SideMenuItem.vue'
import SideMenuSubItem from '~/components/navigation/menu/SideMenuSubItem.vue'
import FilterM from './FilterM.vue'
import ListItem from '~/components/layout/common/ListItem.vue'
import ChevronLeftIcon from '~/components/icons/arrows/ChevronLeftIcon.vue'
import { selectedFiltersToQueryParams, priceRangeToQueryParams } from '~/util/filters'
import PriceFilter from './PriceFilter.vue'

export default {
  fetchOnServer: false,
  components: { SideMenuItem, SideMenuSubItem, FilterM, ListItem, ChevronLeftIcon, PriceFilter },
  data(){
    return {
      brandMenu: null,
      expanded: [],
      selectedFilters: this.$store.state.filters.appliedFilters.flat(),
      selectedCategoryId: null,
      availableFilters: [],
      filterCategoriesBeforeRefresh: []
    }
  },
  computed: {
    filterCategories(){
      return this.$store.state.filters.availableCategories
    },
    selectedCategory(){
      if(this.selectedCategoryId != null)
        return this.filterCategories.find(a => a._id == this.selectedCategoryId)
      else
        return null
    },
    menuItems(){
      return this.filterCategories.map(filterCategory => ({
        handle: filterCategory.handle,
        title: filterCategory.name,
        _id: filterCategory._id,
        children: filterCategory.filters
      }))
    }
  },
  methods: {
    setFilterSelected(handle, selected){

      if(selected)
        this.selectedFilters.push(handle)
      else
        this.selectedFilters = this.selectedFilters.filter(a => a != handle)

      const query = selectedFiltersToQueryParams(this.filterCategoriesBeforeRefresh, this.selectedFilters)
      
      this.$router.push({ path: this.$route.path, query })
    },
    selectCategory(id){
      this.selectedCategoryId = id
      this.availableFilters = this.selectedCategory.filters
      this.filterCategoriesBeforeRefresh = this.filterCategories
    },
    unsetCategory(){
      this.selectedCategoryId = null
    },
    expand(handle){
      this.expanded = [ handle ]
    },
    collapse(handle){
      this.expanded = this.expanded.filter(a => a != handle)
    },
    priceRangeChange(priceRange){
      this.$store.commit("filters/setPriceRange", priceRange)

      const query = {
        ...selectedFiltersToQueryParams(this.filterCategoriesBeforeRefresh, this.selectedFilters),
        ...priceRangeToQueryParams(priceRange)
      }

      this.$router.push({ path: this.$route.path, query })
    }
  }, 
  async fetch(){

    if(this.$route.params.brandHandle || this.$route.params.seriesHandle || this.$route.params.productHandle){

      const { data, loadingState } = await instanceHandler({
        path: "getSeriesForBrand",
        args: { 
          handle: this.$route.params.brandHandle,
          seriesHandle: this.$route.params.seriesHandle,
          productHandle: this.$route.params.productHandle
        },
        cache: true
      })

      if(data?.series?.length){
        const series = data.series

        this.brandMenu = {
          handle: series[0].brand.handle,
          title: this.$t('allSeries'),
          href: `/b/${series[0].brand.handle}`,
          children: series.map(a => ({
            handle: a.handle,
            title: a.name,
            href: `/s/${a.handle}`
          })),
          hideShowAll: !!this.$route.params.brandHandle,
          style: "bold"
        }
      }
    }
    this.$store.commit('loadingState/setLoadingState', LoadingState.ready)
  },
  watch: {
    '$store.state.filters.appliedFilters': function(_appliedFilters){
      this.selectedFilters = _appliedFilters.flat()
    }
  }
}
</script>

<style scoped>
.a-sidebar{
  overflow: auto;
  max-height: calc(100vh - var(--header-y-d) - var(--padding-y-td));
}

.a-filters-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--list-item-y);
  font-weight: 600;
  cursor: pointer;
}
</style>