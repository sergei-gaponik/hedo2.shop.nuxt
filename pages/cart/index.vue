<template>
  <div :class="$device.isMobile ? 'container-m' : 'container'">
    <page-title-m :title="$t('cartPageTitle')" />
    <cart-page />
  </div>
</template>

<script lang="ts">
import CartPage from "~/components/pages/cart/CartPage.vue";
import PageTitleM from "~/components/layout/header/PageTitleM.vue";

export default {
  components: { CartPage, PageTitleM },
};
</script>
