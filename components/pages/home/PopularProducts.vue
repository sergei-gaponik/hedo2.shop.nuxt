<template>
  <div v-if="loadingState != 'error'">
    <h2 v-if="!hideTitle">{{ $t("popularProducts") }}</h2>
    <product-list-horizontal :cols="cols" :products="products" />
  </div>
</template>

<script>
import ProductListHorizontal from "~/components/pages/collection/ProductListHorizontal.vue";
import searchHandler from "~/core/searchHandler";
import instanceHandler from "~/core/instanceHandler";
import { LoadingState } from "~/types";

export default {
  components: { ProductListHorizontal },
  props: {
    hideTitle: Boolean,
  },
  data() {
    return {
      loadingState: LoadingState.ready,
      products: [],
    };
  },
  computed: {
    cols() {
      if (this.$device.isMobile) return 2;
      else if (this.$device.isTablet) return 4;
      else return 5;
    },
    limit() {
      if (this.$device.isMobile) return 6;
      else if (this.$device.isTablet) return 8;
      else return 12;
    },
  },
  async fetch() {
    this.loadingState = LoadingState.loading;

    const r = await searchHandler({
      path: "getProductSearchResults",
      args: {
        limit: this.limit,
        preview: true,
      },
      cache: true,
    });

    if (r.loadingState != LoadingState.ready || !r.data?.ids) {
      this.loadingState = LoadingState.error;
      return;
    }

    const ids = r.data.ids;

    const r2 = await instanceHandler({
      path: "findProducts",
      args: { ids },
      cache: true,
    });

    if (r2.loadingState != LoadingState.ready || !r2.data?.products?.length) {
      this.loadingState = LoadingState.error;
      return;
    }

    this.products = r2.data.products;

    this.loadingState = LoadingState.ready;
  },
};
</script>
