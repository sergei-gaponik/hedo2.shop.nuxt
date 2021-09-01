<template>
  <lazy-wrapper :loadingState="loadingState">
    <div class="a-horizontal-list hide-scrollbar">
      <product-card v-for="product in products" :key="product._id" :product="product" class="a-product"/>
    </div>
  </lazy-wrapper>
</template>

<style scoped>
.a-horizontal-list{
  scroll-snap-type: x mandatory;  
  overflow: scroll;
  display: flex;
  gap: calc(var(--padding) * 2);
  margin-bottom: calc(var(--default-margin) * 2);
}
.a-product {
  scroll-snap-align: start;
}
</style>

<script>
import ProductCard from '~/components/pages/collection/ProductCard.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'

export default {
  components: { ProductCard, LazyWrapper },
  props: [ "loadingState", "products" ]
}
</script>