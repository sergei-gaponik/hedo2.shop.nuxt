<template>
  <div :class="$device.isMobile ? 'container-m' : 'container'">
    <div :class="$device.isDesktop ? 'td-split-1-3' : ''">
      <div v-if="$device.isDesktop">
        <filter-page-d class="td-split-sticky" v-if="$device.isDesktop" />
      </div>
      <div>
        <bread-crumbs :breadCrumbs="breadCrumbs" />
        <lazy-wrapper :loadingState="loadingState">
          <collection-page :filters="filters" :sale="sale" />
        </lazy-wrapper>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionPage from "~/components/pages/collection/CollectionPage.vue";
import BreadCrumbs from "~/components/navigation/BreadCrumbs.vue";
import instanceHandler from "~/core/instanceHandler";
import { LoadingState } from "~/types";
import LazyWrapper from "~/components/util/LazyWrapper.vue";
import FilterPageD from "~/components/pages/collection/filters/FilterPageD.vue";

export default {
  components: { CollectionPage, BreadCrumbs, LazyWrapper, FilterPageD },
  computed: {
    breadCrumbsBase() {
      return [
        {
          caption: this.$t("home"),
          href: this.localePath("/"),
        },
      ];
    },
  },
  data() {
    return {
      breadCrumbs: [],
      filters: [],
      loadingState: LoadingState.ready,
      sale: false,
    };
  },
  async fetch() {
    const collectionHandle = this.$route.params.collectionHandle;

    if (collectionHandle == "all") {
      this.breadCrumbs = [
        ...this.breadCrumbsBase,
        {
          caption: this.$t("allProducts"),
        },
      ];
      return;
    }

    if (collectionHandle == "sale") {
      this.breadCrumbs = [
        ...this.breadCrumbsBase,
        {
          caption: this.$t("saleCollection"),
        },
      ];
      this.sale = true;
      return;
    }

    this.loadingState = LoadingState.loading;

    const { loadingState, data } = await instanceHandler({
      path: "getCategory",
      args: { handle: collectionHandle },
      cache: true,
    });

    this.loadingState = loadingState;
    if (this.loadingState != LoadingState.ready) return;

    if (!data.category) {
      this.loadingState = LoadingState.notFound;
      return;
    }

    this.filters = data.category.filters || [];
    let parent = data.category.parent;
    let categoryBreadCrumbs = [];

    while (parent) {
      categoryBreadCrumbs = [
        {
          caption: parent.title || parent.name,
          href: this.localePath("/c/" + parent.handle),
        },
        ...categoryBreadCrumbs,
      ];

      parent = parent.parent;
    }

    categoryBreadCrumbs.push({
      caption: data.category.name,
    });

    this.breadCrumbs = [...this.breadCrumbsBase, ...categoryBreadCrumbs];
  },
};
</script>
