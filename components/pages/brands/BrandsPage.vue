<template>
  <div
    v-if="brands"
    :class="$device.isMobile ? 'container-m' : 'container td-split'"
  >
    <div v-if="$device.isMobile" class="a-featured mb4">
      <featured-brand
        v-for="brand in featuredBrands"
        :key="brand._id"
        :brand="brand"
      />
    </div>
    <div :class="$device.isMobile ? '' : 'td-split-sticky'">
      <div class="a-right-td">
        <h4>{{ $t("fromAtoZ") }}</h4>
        <div class="a-brands">
          <list-item
            v-for="brand in sortedBrands"
            :key="brand._id"
            :caption="brand.name"
            @click="$router.push(localePath('/b/' + brand.handle))"
          />
        </div>
      </div>
    </div>
    <div v-if="!$device.isMobile" class="a-featured mb4 td-split-sticky">
      <featured-brand
        v-for="brand in featuredBrands"
        :key="brand._id"
        :brand="brand"
      />
    </div>
  </div>
</template>

<script>
import FeaturedBrand from "./FeaturedBrand.vue";
import ListItem from "~/components/layout/common/ListItem.vue";

export default {
  components: { FeaturedBrand, ListItem },
  props: ["brands"],
  computed: {
    featuredBrands() {
      return this.brands
        .filter((a) => !!a.featured)
        .sort((a, b) => a.name.localeCompare(b.name));
    },
    sortedBrands() {
      return this.brands.sort((a, b) => a.name.localeCompare(b.name));
    },
  },
};
</script>

<style scoped>
.a-featured {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap);
}
.a-brands {
  position: relative;
  left: calc(0px - var(--padding-x));
  width: calc(100% + var(--padding-x) * 2);
}
.a-right-td {
  position: relative;
}
</style>
