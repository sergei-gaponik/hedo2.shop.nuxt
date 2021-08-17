<template>
  <div class="a-grid">
    <product-card v-for="product in products" :key="product._id" :product="product"/>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  props: ["products"],
  components: { ProductCard }
}
</script>

<style scoped>
.a-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--padding) * 2) calc(var(--padding) * 2);
}
</style>