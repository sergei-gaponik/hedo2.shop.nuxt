<template>
  <div class="a-grid" :style="{ gridTemplateColumns: '1fr '.repeat(cols || 2) }">
    <product-card v-for="product in products" :key="product._id" :product="product"/>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  props: ["products", "cols"],
  components: { ProductCard }
}
</script>

<style scoped>
.a-grid {
  display: grid;
  gap: calc(var(--padding) * 2) calc(var(--padding) * 2);
  width: 100%;
}
</style>