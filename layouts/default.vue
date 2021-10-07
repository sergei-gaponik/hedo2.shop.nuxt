<template>
  <div v-if="$device.isMobile">
    <header-m />
    <error-notification />
    <search-results v-show="$store.state.search.searchResultsVisible" />
    <Nuxt v-show="!$store.state.search.searchResultsVisible" />
    <drawer-left-m :show="$store.state.nav.menuDrawerOpen">
      <side-menu-m />
    </drawer-left-m>
    <footer-m />
  </div>
  <div v-else-if="$device.isTablet">
    <header-t />
    <error-notification />
    <search-results v-show="$store.state.search.searchResultsVisible" />
    <Nuxt v-show="!$store.state.search.searchResultsVisible" />
    <drawer-left-t :show="$store.state.nav.menuDrawerOpen">
      <side-menu-m />
    </drawer-left-t>
  </div>
  <div v-else>

  </div>
</template>

<script>

import HeaderM from '~/components/layout/header/HeaderM.vue'
import HeaderT from '~/components/layout/header/HeaderT.vue'
import FooterM from '~/components/layout/footer/FooterM.vue'
import DrawerLeftM from '~/components/layout/drawer/DrawerLeftM.vue'
import DrawerLeftT from '~/components/layout/drawer/DrawerLeftT.vue'
import SideMenuM from '~/components/navigation/menu/SideMenuM.vue'
import SearchResults from '~/components/layout/header/SearchResults.vue'
import ErrorNotification from '~/components/layout/misc/ErrorNotification.vue'
import PopUp from '~/components/layout/misc/PopUp.vue'
import LoginPage from '~/components/pages/login/SignInPage.vue'

export default {
  components: { HeaderM, HeaderT, FooterM, DrawerLeftM, DrawerLeftT, SideMenuM, ErrorNotification, SearchResults, PopUp, LoginPage },
}

</script>