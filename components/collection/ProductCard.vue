<template>
<nuxt-link 
  :to="localePath('/p/'+product.handle)"
  @click.native="$store.commit('search/reset')"
>
  <div class="a-container">
    <product-image :src="src" />
    <div style="margin-top:20px;"></div>
    <product-title :product="product" :fontSize=0.9 />
  </div>
</nuxt-link>
</template>

<script>
import ProductImage from '~/components/product/ProductImage.vue'
import ProductTitle from '~/components/product/ProductTitle.vue'

export default {
  components: { ProductImage, ProductTitle },
  props: ["product"],
  data() {
    return {
      src: this.$props.product?.images[0]?.src || ""
    }
  }
}
</script>

<style scoped>

.a-container {
  position: relative;
  min-width: calc(50vw - (var(--padding-x-m) * 2));
  max-width: calc(50vw - (var(--padding-x-m) * 2));
  text-align: center;
}

</style>

