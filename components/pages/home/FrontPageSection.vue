<template>
  <div>
    <div :style="{ backgroundColor }">
      <div :class="$device.isMobile ? 'container-m' : 'container'">
        <div :class="$device.isMobile ? 'mb4 flex-v' : 'td-split mb4'">
          <div>
            <h1 class="a-heading1">{{ frontPageSection.heading1 }}</h1>
            <h2 class="a-heading2">{{ frontPageSection.heading2 }}</h2>
            <p class="a-text">{{ frontPageSection.text }}</p>
            <nuxt-link class="a-link" :to="localePath(frontPageSection.href)">
              <h6>{{ linkTitle }}</h6>
              <chevron-right-icon height="16" color="var(--c-gray-1)" />
            </nuxt-link>
          </div>
          <div class="a-img-container">
            <lazy-image class="a-img" :src="frontPageSection.image.src" s3 />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="products.length"
      :class="$device.isMobile ? 'container-m' : 'container'"
    >
      <product-list-horizontal
        v-if="loadingState != 'error'"
        :cols="cols"
        :products="products"
      />
    </div>
  </div>
</template>

<script>
import ProductListHorizontal from "~/components/pages/collection/ProductListHorizontal.vue";
import searchHandler from "~/core/searchHandler";
import instanceHandler from "~/core/instanceHandler";
import { LoadingState } from "~/types";
import LazyImage from "~/components/util/LazyImage.vue";
import ChevronRightIcon from "~/components/icons/arrows/ChevronRightIcon.vue";

export default {
  components: { ProductListHorizontal, LazyImage, ChevronRightIcon },
  props: ["frontPageSection"],
  computed: {
    cols() {
      if (this.$device.isMobile) return 2;
      else if (this.$device.isTablet) return 4;
      else return 5;
    },
    backgroundColor() {
      return this.frontPageSection.color || "white";
    },
    linkTitle() {
      return this.frontPageSection.linkTitle || this.$t("showAll");
    },
  },
  data() {
    return {
      products: [],
      loadingState: LoadingState.ready,
    };
  },
  async fetch() {
    if (!this.frontPageSection) return;

    if (
      !Object.values(this.frontPageSection.productQuery).filter((a) => a).length
    )
      return;

    this.loadingState = LoadingState.loading;

    const r = await searchHandler({
      path: "getProductSearchResults",
      args: {
        ...this.frontPageSection.productQuery,
        limit: 5,
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

<style scoped>
.a-link {
  display: flex;
  gap: var(--gap-s);
  align-items: center;
  height: var(--list-item-y);
  font-weight: 600;
  color: black;
}

.a-heading1 {
  font-family: var(--handwriting-font);
  font-size: 2.5rem;
  line-height: 4rem;
  color: black;
  opacity: 0.6;
}

.a-heading2 {
  letter-spacing: var(--letter-spacing);
  text-transform: uppercase;
  color: black;
  opacity: 0.7;
}

.a-text {
  color: black;
  opacity: 0.8;
}

.a-img-container {
  position: relative;
  width: 100%;
}
.a-img-container:after {
  content: "";
  display: block;
  padding-bottom: 50%;
}

.a-img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}
</style>
