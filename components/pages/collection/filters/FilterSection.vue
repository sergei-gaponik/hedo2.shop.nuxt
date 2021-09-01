<template>
<div class="a-container">
  <drawer-bottom-m :show="$store.state.nav.filterDrawerOpen">
    <filter-page-m />
  </drawer-bottom-m>

  <div class="a-section">
    <div class="a-header">
      <div class="subdued">{{ productCountCaption }}</div>
      <div>
        <filter-button :action="openFilterDrawer" />
      </div>
    </div>
    <div class="a-applied-filters">
      <tag 
        v-if="$store.state.filters.appliedFilterTags.length" 
        :caption="$t('resetFilters')"
        @click="reset"
        clickable />
      <tag 
        v-for="filterTag in $store.state.filters.appliedFilterTags" 
        :key="filterTag._id"
        :caption="filterTag.title"
        @remove="() => remove(filterTag.handle)"
        removeable />
    </div>
  </div>
</div>
</template>

<script>
import Tag from '~/components/layout/misc/Tag.vue'
import FilterButton from '~/components/layout/buttons/FilterButton.vue'
import { appliedFiltersToQueryParams, removeFromAppliedFilters } from '~/util/filters'
import FilterPageM from './FilterPageM.vue'
import DrawerBottomM from '~/components/layout/drawer/DrawerBottomM.vue'

export default {
  components: { Tag, FilterButton, FilterPageM, DrawerBottomM },
  props: [ "productCount" ],
  methods: {
    reset(){
      this.$router.push({ path: this.$route.path })
    },
    remove(handle){

      const appliedFilters = removeFromAppliedFilters(this.$store.state.filters.appliedFilters, handle)
      const query = appliedFiltersToQueryParams(appliedFilters)
      
      this.$router.push({ path: this.$route.path, query })
    },
    openFilterDrawer(){
      this.$store.commit("nav/openFilterDrawer")
    }
  },
  computed: {
    productCountCaption(){
      if(this.productCount == 0)
        return ""
      if(this.productCount == 1)
        return `1 ${this.$t('result')}`
      else
        return `${this.productCount} ${this.$t('results')}`
    }
  }
}
</script>

<style scoped>
.a-applied-filters{
  display: flex;
  gap: var(--gap-s);
  flex-wrap: wrap;
}
.a-container{
  height: min-content;
  padding: calc(2 * var(--default-margin)) 0;
}
.a-section{
  display: flex;
  flex-direction: column;
  gap: var(--default-margin);
}
.a-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>