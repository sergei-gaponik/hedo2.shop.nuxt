<template>
  <div>
    <filter-section :productCount="ids.length" />
    <div v-if="loadingState == 'ready' && !products.length">
      {{ $t("noResults") }}
    </div>
    <div v-else>
      <product-grid :products="products" class="mb2" :cols="cols" />
      <collection-pagination
        :page="page"
        :totalPages="totalPages"
        :limit="limit"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @setLimit="setLimit"
      />
    </div>
  </div>
</template>

<script>
import searchHandler from "~/core/searchHandler";
import { LoadingState } from "~/types";
import ProductGrid from "~/components/pages/collection/ProductGrid.vue";
import instanceHandler from "~/core/instanceHandler";
import LazyWrapper from "~/components/util/LazyWrapper.vue";
import FilterSection from "~/components/pages/collection/filters/FilterSection.vue";
import CollectionPagination from "./CollectionPagination.vue";
import { GLOBAL } from "~/core/const";
import FilterPageD from "~/components/pages/collection/filters/FilterPageD.vue";
import {
  appliedFiltersFromQueryParams,
  priceRangeFromQueryParams,
} from "~/util/filters";

export default {
  components: {
    ProductGrid,
    LazyWrapper,
    FilterSection,
    CollectionPagination,
    FilterPageD,
  },
  props: ["series", "brand", "filters", "query", "sale"],
  data() {
    return {
      loadingState: LoadingState.ready,
      products: [],
      page: 1,
      limit: GLOBAL.defaultPaginationLimit,
      ids: [],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.ids.length / this.limit);
    },
    cols() {
      if (this.$device.isMobile) return 2;
      else return 3;
    },
  },
  methods: {
    nextPage() {
      if (this.page < this.totalPages) this.page++;
    },
    prevPage() {
      if (this.page > 1) this.page--;
    },
    setLimit(limit) {
      this.limit = limit;
    },
  },
  async fetch() {
    if (process.client) window.scrollTo(0, 0);

    this.loadingState = LoadingState.loading;

    this.$store.commit("loadingState/setLoadingState", LoadingState.loading);
    this.$store.commit(
      "filters/setAppliedFilters",
      appliedFiltersFromQueryParams(this.$route.query)
    );
    this.$store.commit(
      "filters/setPriceRange",
      priceRangeFromQueryParams(this.$route.query)
    );

    const minDiscount =
      this.$route.query.sale || this.sale ? GLOBAL.specialOfferMin : 0;

    const appliedFilters = this.$store.state.filters.appliedFilters;
    const filters = [...appliedFilters, ...(this.filters || [])];

    const r = await searchHandler({
      path: "getProductSearchResults",
      args: {
        query: this.query,
        series: this.series,
        brand: this.brand,
        priceRange: this.$store.state.filters.priceRange,
        minDiscount,
        filters,
      },
      cache: true,
    });

    if (r.loadingState != LoadingState.ready || !r.data?.ids) {
      this.loadingState = LoadingState.error;
      this.$store.commit("loadingState/setLoadingState", LoadingState.error);
      return;
    }

    const ids = r.data.ids;
    const properties = r.data.properties;

    if (!this.$route.query?.p) {
      this.$store.commit("filters/setPriceRange", r.data.priceRange || null);
      this.$store.commit("filters/setMaxPriceRange", r.data.priceRange || null);
    }

    this.ids = ids;

    const { page, limit } = this;

    const r2 = await instanceHandler({
      bulk: [
        {
          path: "findProducts",
          args: { ids, page, limit },
        },
        {
          path: "getFilters",
          args: { properties, appliedFilters },
        },
      ],
      cache: true,
    });

    this.products = r2.bulk[0].data?.products || [];
    this.loadingState = r2.loadingState;
    const data = r2.bulk[1].data;

    this.$store.commit(
      "filters/setAvailableCategories",
      data?.filterCategories || []
    );
    this.$store.commit(
      "filters/setAppliedFilterTags",
      data?.appliedFilters || []
    );

    this.$store.commit("loadingState/setLoadingState", LoadingState.ready);
  },
  watch: {
    "$route.query": function () {
      this.page = 1;
      this.limit = GLOBAL.defaultPaginationLimit;
      this.$store.commit("nav/closeAllDrawers");
      this.$store.commit("search/reset");

      this.$fetch();
    },
    limit: function () {
      this.$store.commit("nav/closeAllDrawers");

      if (this.ids.length > this.limit) this.$store.commit("search/reset");

      this.$fetch();
    },
    page: function () {
      this.$store.commit("nav/closeAllDrawers");
      this.$store.commit("search/reset");

      this.$fetch();
    },
  },
};
</script>
