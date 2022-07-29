<template>
  <div class="a-container">
    <div class="a-brand-groups">
      <div class="a-brands" v-for="(brands, i) in brandGroups" :key="i">
        <nuxt-link
          v-for="brand in brands"
          :key="brand._id"
          :to="localePath('/b/' + brand.handle)"
          @click.native="$emit('leave')"
        >
          {{ brand.name }}
        </nuxt-link>
      </div>
    </div>
    <div class="a-featured">
      <featured-brand
        v-for="brand in featuredBrands"
        :brand="brand"
        :key="brand._id"
        noBorder
        @click="$emit('leave')"
      />
    </div>
  </div>
</template>

<script>
import { LoadingState } from "~/types";
import instanceHandler from "~/core/instanceHandler";
import FeaturedBrand from "~/components/pages/brands/FeaturedBrand.vue";

export default {
  components: { FeaturedBrand },
  props: ["brands"],
  data() {
    const brands =
      this.brands?.sort((a, b) => a.name.localeCompare(b.name)) || [];

    const featuredBrands = this.brands?.filter((a) => !!a.featured) || [];

    const cols = 3;
    const n = Math.ceil(brands.length / cols);

    const brandGroups = [...Array(cols).keys()].map((a) =>
      brands.slice(a * n, (a + 1) * n)
    );

    return {
      featuredBrands,
      brandGroups,
    };
  },
};
</script>

<style scoped>
.a-container {
  display: grid;
  grid-template-columns: calc(60% - var(--padding-x-td)) 40%;
  grid-gap: var(--padding-x-td);
}
.a-brand-groups {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.a-brands {
  display: flex;
  flex-direction: column;
  line-height: 2.5rem;
}

.a-featured {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--gap);
}
</style>
