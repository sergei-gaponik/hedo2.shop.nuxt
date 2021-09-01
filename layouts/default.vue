<template>
<div>
  <div v-if="$device.isMobile">
    <header-m />
    <error-notification-m />
    <search-results-m v-show="$store.state.search.searchResultsVisible" />
    <Nuxt v-show="!$store.state.search.searchResultsVisible" />
    <drawer-left-m :show="$store.state.nav.menuDrawerOpen">
      <side-menu-m />
    </drawer-left-m>
    <footer-m />
  </div>
</div>
</template>

<script>

import HeaderM from '~/components/layout/header/HeaderM.vue'
import FooterM from '~/components/layout/footer/FooterM.vue'
import DrawerLeftM from '~/components/layout/drawer/DrawerLeftM.vue'
import SideMenuM from '~/components/layout/menu/SideMenuM.vue'
import SearchResultsM from '~/components/layout/header/SearchResultsM.vue'
import ErrorNotificationM from '~/components/layout/misc/ErrorNotificationM.vue'

export default {
  components: { HeaderM, FooterM, SearchResultsM, DrawerLeftM, SideMenuM, ErrorNotificationM }
}

</script>