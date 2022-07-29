<template>
  <div v-if="dummy">
    <div class="a-container">
      <div class="a-dummy-img"></div>
      <div style="margin-top: 20px"></div>
      <span class="a-dummy-title">
        {{ "aaaa ".repeat("9") }}
      </span>
    </div>
  </div>
  <nuxt-link
    v-else-if="product"
    :to="localePath('/p/' + product.handle)"
    @click.native="$store.commit('search/reset')"
  >
    <div class="a-container">
      <product-image :src="src" :altSrc="altSrc" />
      <div style="margin-top: 20px"></div>
      <product-title :product="product" :fontSize="0.9" center />
    </div>
  </nuxt-link>
</template>

<script>
import ProductImage from "~/components/pages/product/ProductImage.vue";
import ProductTitle from "~/components/pages/product/ProductTitle.vue";

export default {
  components: { ProductImage, ProductTitle },
  props: {
    product: Object,
    dummy: Boolean,
  },
  data() {
    return {
      src: this.product?.images[0]?.asset.src || "",
      altSrc:
        this.product?.images?.length > 1
          ? this.product.images[1].asset.src
          : "",
    };
  },
};
</script>

<style scoped>
.a-container {
  position: relative;
  text-align: center;
}

.a-dummy-img {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  background-color: var(--c-green-3-l);
  border-radius: var(--border-radius);
}

.a-dummy-title {
  background-color: var(--c-green-3-l);
  color: transparent;
  line-height: 2rem;
}
</style>
