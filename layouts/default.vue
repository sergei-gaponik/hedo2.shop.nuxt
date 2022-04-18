<template>
  <div>
    <portal-target name="body" />
    <notification />
    <confirm-dialog />
    <div class="a-container">
      <div v-if="$device.isMobile">
        <header-m />
        <search-results v-show="$store.state.search.searchResultsVisible" />
        <Nuxt v-show="!$store.state.search.searchResultsVisible" />
        <drawer-left-m :show="$store.state.nav.menuDrawerOpen">
          <side-menu-m />
        </drawer-left-m>
        <footer-m />
      </div>
      <div v-else-if="$device.isTablet">
        <header-t />
        <search-results v-show="$store.state.search.searchResultsVisible" />
        <Nuxt v-show="!$store.state.search.searchResultsVisible" />
        <drawer-left-t :show="$store.state.nav.menuDrawerOpen">
          <side-menu-m />
        </drawer-left-t>
      </div>
      <div v-else>
        <header-d />
        <Nuxt/>
      </div>
    </div>
    <page-footer />
  </div>
</template>

<script>

import HeaderM from '~/components/layout/header/HeaderM.vue'
import HeaderT from '~/components/layout/header/HeaderT.vue'
import HeaderD from '~/components/layout/header/HeaderD.vue'
import FooterM from '~/components/layout/footer/FooterM.vue'
import DrawerLeftM from '~/components/layout/drawer/DrawerLeftM.vue'
import DrawerLeftT from '~/components/layout/drawer/DrawerLeftT.vue'
import SideMenuM from '~/components/navigation/menu/SideMenuM.vue'
import SearchResults from '~/components/layout/header/SearchResults.vue'
import Notification from '~/components/layout/misc/Notification.vue'
import PopUp from '~/components/layout/misc/PopUp.vue'
import LoginPage from '~/components/pages/login/SignInPage.vue'
import ConfirmDialog from '~/components/layout/misc/ConfirmDialog.vue'
import PageFooter from '~/components/layout/footer/PageFooter.vue'

export default {
  components: { HeaderM, HeaderT, HeaderD, FooterM, DrawerLeftM, DrawerLeftT, SideMenuM, Notification, SearchResults, PopUp, LoginPage, ConfirmDialog, PageFooter },
  created(){
    if(!process.client) return;

    this.$store.commit("cart/init")
    this.$store.commit("checkout/init")

    let root = document.documentElement

    if(this.$device.isMobile){
      root.style.setProperty('--header-y', 'var(--header-y-m)')
      root.style.setProperty('--padding-x', 'var(--padding-x-m)')
      root.style.setProperty('--padding-y', 'var(--padding-y-m)')
    }
    else if(this.$device.isTablet){
      root.style.setProperty('--header-y', 'var(--header-y-t)')
      root.style.setProperty('--padding-x', 'var(--padding-x-td)')
      root.style.setProperty('--padding-y', 'var(--padding-y-td)')
    }
    else{
      root.style.setProperty('--header-y', 'var(--header-y-d)')
      root.style.setProperty('--padding-x', 'var(--padding-x-td)')
      root.style.setProperty('--padding-y', 'var(--padding-y-td)')
    }

  }
}

</script>

<style scoped>
.a-container{
  position: relative;
  min-height: calc(100vh - var(--header-y));
  padding-bottom: var(--margin-4);
  width: 100vw;
}
</style>