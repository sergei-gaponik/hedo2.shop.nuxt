<template>
  <div :class="$device.isMobile ? 'container-m' : 'container'">
    <div :class="$device.isDesktop ? 'td-split-1-3' : ''">
      <div v-if="$device.isDesktop">
        <filter-page-d class="td-split-sticky" v-if="$device.isDesktop" />
      </div>
      <div>
        <bread-crumbs :breadCrumbs="breadCrumbs" />
        <lazy-wrapper :loadingState="loadingState">
          <collection-page :series="$route.params.seriesHandle" />
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
  data() {
    return {
      loadingState: LoadingState.ready,
      breadCrumbs: [],
    };
  },
  async fetch() {
    this.$store.commit("loadingState/setLoadingState", LoadingState.loading);
    this.loadingState = LoadingState.loading;

    const { loadingState, data } = await instanceHandler({
      path: "getOneSeries",
      args: { handle: this.$route.params.seriesHandle },
      cache: true,
    });

    this.loadingState = loadingState;
    this.$store.commit("loadingState/setLoadingState", LoadingState.ready);

    const seriesInfo = data?.series;

    if (seriesInfo) {
      this.breadCrumbs = [
        {
          caption: this.$t("home"),
          href: this.localePath("/"),
        },
        {
          caption: seriesInfo.brand.name,
          href: this.localePath(`/b/${seriesInfo.brand.handle}`),
        },
        {
          caption: seriesInfo.name,
        },
      ];
    }
  },
};
</script>
