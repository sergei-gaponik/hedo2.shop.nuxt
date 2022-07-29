<template>
  <div
    class="a-grid"
    :style="{ gridTemplateColumns: '1fr '.repeat(cols || 2) }"
  >
    <product-card
      v-for="product in computedProducts"
      :key="product._id"
      :product="product._dummy ? null : product"
      :dummy="product._dummy"
    />
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  props: ["products", "cols"],
  components: { ProductCard },
  computed: {
    computedProducts() {
      if (this.products?.length) return this.products;
      else
        return [...Array(this.cols).keys()].map((a) => ({
          _id: a,
          _dummy: true,
        }));
    },
  },
};
</script>

<style scoped>
.a-grid {
  display: grid;
  gap: calc(var(--padding) * 2) calc(var(--padding) * 2);
  width: 100%;
}
</style>
