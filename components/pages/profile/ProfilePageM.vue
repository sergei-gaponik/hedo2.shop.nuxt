<template>
  <div class="a-outer">
    <div
      class="a-container"
      :style="{ transform: pageVisible ? 'translateX(-100%)' : 'none' }"
    >
      <div class="a-menu">
        <div class="container-m">
          <page-title-m :title="$t('profilePageTitle')" />
        </div>
        <list-item :caption="$t('orders')" @click="setPage('orders')" />
        <list-item :caption="$t('addresses')" @click="setPage('address')" />
        <list-item
          :caption="$t('personalData')"
          @click="setPage('personalData')"
        />
      </div>
      <div class="a-page">
        <div class="container-m">
          <page-title-m :title="$t(pageTitle)" backButton @back="hidePage()" />
          <orders-page v-if="page == 'orders'" />
          <address-page v-if="page == 'address'" />
          <personal-data-page v-if="page == 'personalData'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronLeftIcon from "~/components/icons/arrows/ChevronLeftIcon.vue";
import ChevronRightIcon from "~/components/icons/arrows/ChevronRightIcon.vue";
import PageTitleM from "~/components/layout/header/PageTitleM.vue";
import AddressPage from "./AddressPage.vue";
import OrdersPage from "./OrdersPage.vue";
import PersonalDataPage from "./PersonalDataPage.vue";
import ListItem from "~/components/layout/common/ListItem.vue";

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    AddressPage,
    OrdersPage,
    PersonalDataPage,
    PageTitleM,
    ListItem,
  },
  computed: {
    pageTitle() {
      switch (this.page) {
        case "orders":
          return "orders";
        case "address":
          return "addressPageTitle";
        case "personalData":
          return "personalData";
      }
    },
  },
  methods: {
    setPage(page) {
      this.page = page;
      this.pageVisible = true;
    },
    hidePage() {
      this.pageVisible = false;
    },
  },
  data() {
    return {
      page: null,
      pageVisible: false,
    };
  },
};
</script>

<style scoped>
.a-padding {
  padding: 0 var(--padding-x-m);
}
.a-outer {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: calc(100vh - var(--header-y-m) - var(--footer-y-m));
}
.a-container {
  position: relative;
  transition: var(--drawer-transition);
}
.a-menu {
  position: absolute;
  width: 100vw;
  height: calc(100vh - var(--header-y-m) - var(--footer-y-m));
  overflow-y: auto;
}
.a-page {
  position: absolute;
  width: 100vw;
  height: calc(100vh - var(--header-y-m) - var(--footer-y-m));
  overflow-y: auto;
  transform: translateX(100%);
}
</style>
