<template>
  <div class="container-slim-d">
    <page-title-m :title="$t('profilePageTitle')" />
    <div class="td-split">
      <div class="td-split-sticky">
        <h2>{{ $t('orders') }}</h2>
        <orders-page class="mb4" />
        <h2>{{ $t('addressPageTitle') }}</h2>
        <address-page />
      </div>
      <div class="td-split-sticky">
        <personal-data-page />
      </div>
    </div>
  </div>
</template>

<script>
import PageTitleM from '~/components/layout/header/PageTitleM.vue'
import AddressPage from './AddressPage.vue'
import OrdersPage from './OrdersPage.vue'
import PersonalDataPage from './PersonalDataPage.vue'
import ListItem from '~/components/layout/common/ListItem.vue'

export default {
  components: { AddressPage, OrdersPage, PersonalDataPage, PageTitleM, ListItem },
}
</script>

<style scoped>
.a-padding{
  padding: 0 var(--padding-x-m);
}
.a-outer{
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: calc(100vh - var(--header-y-m) - var(--footer-y-m));
}
.a-container{
  position: relative;
  transition: var(--drawer-transition);
}
.a-menu{
  position: absolute;
  width: 100vw;
  height: calc(100vh - var(--header-y-m) - var(--footer-y-m));
  overflow-y: auto;
}
.a-page{
  position: absolute;
  width: 100vw;
  height: calc(100vh - var(--header-y-m) - var(--footer-y-m));
  overflow-y: auto;
  transform: translateX(100%);
}
</style>