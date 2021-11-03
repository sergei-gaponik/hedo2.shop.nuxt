<template>
  <lazy-wrapper>
    <div class="a-horizontal-list hide-scrollbar" :style="{ width: containerWidth }">
      <product-card 
        v-for="product in products" 
        :key="product._id" 
        :product="product" 
        class="a-product"
        :style="{ minWidth: cardWidth, maxWidth: cardWidth }"
      />
    </div>
  </lazy-wrapper>
</template>

<script>
import ProductCard from '~/components/pages/collection/ProductCard.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'

export default {
  components: { ProductCard, LazyWrapper },
  props: [ "products", "cols", "vw" ],
  computed: {
    cardWidth() {
      return `${Math.round(100 / (this.cols || 2))}%`
    },
    containerWidth(){
      return "100%"//`calc(${this.vw || 100}vw - calc(${this.$device.isMobile ? 'var(--padding-x-m)' : 'var(--padding-x-td)'} * 2)`
    }
  }
}
</script>

<style scoped>
.a-horizontal-list{
  scroll-snap-type: x mandatory;  
  overflow: scroll;
  display: flex;
  position: relative;
}
.a-product {
  scroll-snap-align: start;
  padding: var(--padding);
  box-sizing: border-box;
}
</style>