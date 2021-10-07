<template>
  <div class="a-page" v-if="selectedCategory != null">
    <div class="a-container" :style="{ transform: showFilters ? 'translateX(-100%)' : 'none' }">
      <div :class="['a-categories', $device.isMobile ? '' : 'a-categories-t']">
        <filter-category-m 
          v-for="(category, index) in $store.state.filters.availableCategories" 
          :key="category._id"
          :category="category"
          :last="index == $store.state.filters.availableCategories.length - 1"
          @click="() => selectCategory(index)"
        />
      </div>
      <div :class="['a-filters', $device.isMobile ? '' : 'a-filters-t']">
        <div 
          type="button"
          class="a-filters-header"
          @click="closeFilters"
        >
          <chevron-left-icon height=16 color="var(--c-gray-1)" />
          <div>{{ selectedCategory.name }}</div>
          <div style="width:16px" />
        </div>
        <filter-m 
          v-for="(filter, index) in selectedCategory.filters"
          :key="filter._id"
          :filter="filter"
          :last="index == selectedCategory.filters.length - 1"
          :selected="selectedFilters.includes(filter.handle)"
          @input="v => setFilterSelected(filter.handle, v)"
        />
      </div>
    </div>
    <button :class="['a-button', filtersChanged ? 'a-button-apply' : 'a-button-close', $device.isMobile ? '' : 'a-button-t']" @click="apply">
      {{ filtersChanged ? $t("apply") : $t('buttonClose') }}
    </button>
  </div>
  <div v-else>
    Keine Filter
  </div>
</template>

<script>
import FilterCategoryM from '~/components/pages/collection/filters/FilterCategoryM.vue'
import FilterM from '~/components/pages/collection/filters/FilterM.vue'
import ChevronLeftIcon from '~/components/icons/arrows/ChevronLeftIcon.vue'
import { selectedFiltersToQueryParams } from '~/util/filters'

export default {
  components: { FilterCategoryM, FilterM, ChevronLeftIcon },
  data() {
    return {
      selectedCategoryIndex: 0,
      showFilters: false,
      selectedFilters: this.$store.state.filters.appliedFilters.flat()
    }
  },
  methods: {
    apply(){
      if(!this.filtersChanged)
        this.$store.commit("nav/closeAllDrawers")
        this.$store.commit("search/reset")

      const categories = this.$store.state.filters.availableCategories
      const query = selectedFiltersToQueryParams(categories, this.selectedFilters)
      
      this.$router.push({ path: this.$route.path, query })
    },
    selectCategory(index){
      this.selectedCategoryIndex = index
      this.showFilters = true
    },
    setFilterSelected(id, selected){
      if(selected)
        this.selectedFilters.push(id)
      else
        this.selectedFilters = this.selectedFilters.filter(a => a != id)
    },
    closeFilters(){
      this.showFilters = false
    }
  },
  computed: {
    selectedCategory(){
      if(this.$store.state.filters.availableCategories.length >= this.selectedCategoryIndex)
        return this.$store.state.filters.availableCategories[this.selectedCategoryIndex]
      else
        return null
    },
    filtersChanged(){
      const appliedFilters = this.$store.state.filters.appliedFilters.flat()

      return !this.selectedFilters.every(a => appliedFilters.includes(a))
    }
  },
  watch: {
    '$store.state.filters.appliedFilters': function(_appliedFilters){
      this.selectedFilters = _appliedFilters.flat()
    }
  }
}
</script>

<style scoped>
.a-page{
  position: relative;
  height: 100%;
  top: 0;
}
.a-container{
  position: relative;
  transition: var(--drawer-transition);
  height: calc(100% - var(--list-item-y));
}

.a-categories{
  position: absolute;
  width: 100vw;
  height: 100%;
  overflow: scroll;
}

.a-categories-t{
  width: var(--drawer-x-t);
}

.a-filters{
  position: absolute;
  width: 100vw;
  height: 100%;
  transform: translateX(100%);
  overflow: scroll;
}

.a-filters-t{
  width: var(--drawer-x-t);
}

.a-filters-header{
  all: unset;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--c-gray-3);
  padding: 0 calc(var(--padding) * 1.5);
  align-items: center;
  height: var(--list-item-y);
  font-weight: 600;
}

.a-button{
  all: unset;
  position: absolute;
  color: #fff;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: var(--list-item-y);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing);
}

.a-button-t{
  width: var(--drawer-x-t);
}

.a-button-apply{
  background-color: #000;
  box-shadow: 0px -4px 7px var(--c-gray-3);
}
.a-button-close{
  background-color: var(--c-gray-1);
}

</style>