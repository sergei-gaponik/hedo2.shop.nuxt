<template>
<nuxt-link 
  :to="localePath('/p/'+product.handle)"
  @click.native="$store.commit('search/reset')"
>
  <div class="a-container">
    <product-image :src="src" />
    <div style="margin-top:20px;"></div>
    <product-title :product="product" :fontSize=0.9 center />
  </div>
</nuxt-link>
</template>

<script>
import ProductImage from '~/components/pages/product/ProductImage.vue'
import ProductTitle from '~/components/pages/product/ProductTitle.vue'

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
  text-align: center;
}

</style>

