<template>
<div>
  <div v-if="$device.isMobile">
    <header-m />
    <search-results-m v-show="$store.state.search.searchResultsVisible" />
    <Nuxt v-show="!$store.state.search.searchResultsVisible" />
    <drawer-m :show="$store.state.nav.menuDrawerOpen" />
    <filter-drawer-m :show="$store.state.nav.filterDrawerOpen" />
    <footer-m />
  </div>
</div>
</template>

<script>

import HeaderM from '~/components/layout/header/HeaderM.vue'
import FooterM from '~/components/layout/footer/FooterM.vue'
import DrawerM from '~/components/layout/drawer/DrawerM.vue'
import SearchResultsM from '~/components/layout/searchResults/SearchResultsM.vue'
import FilterDrawerM from '~/components/layout/drawer/FilterDrawerM.vue'

export default {
  components: { HeaderM, FooterM, SearchResultsM, DrawerM, FilterDrawerM }
}

</script>