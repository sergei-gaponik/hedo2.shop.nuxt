<template>
  <div class="a-product">
    <div class="a-img">
      <product-image :src="image" />
    </div>
    <div @click="$emit('click')">
      <product-title 
        :product="product"
        :hideInfoTag="true"
        :hidePrice="true"
        :customTag="customTag"
        :altPriceCaption="altPriceCaption"
      />
    </div>
  </div>
</template>

<script>
import ProductImage from './ProductImage.vue'
import ProductTitle from './ProductTitle.vue'

export default {
  components: { ProductImage, ProductTitle },
  props: {
    product: Object,
    variant: Object,
    quantity: Number,
    hidePrice: Boolean,
  },
  computed: {
    altPriceCaption(){
      if(!this.hidePrice)
        return this.quantity ? `${this.quantity} x ${this.priceCaption}` : this.priceCaption
      else
        return null
    },
    priceCaption(){
      return `${this.variant.price.toLocaleString(this.$i18n.localeProperties.numberFormat, { style:'currency', currency: this.$i18n.localeProperties.currency } )}`
    },
    image(){
      return this.variant.images?.length ? this.variant.images[0].asset.src : this.product.images[0].asset.src
    },
    customTag(){
      return this.variant.title || ""
    }
  }
}
</script>

<style scoped>
.a-product{
  display: grid;
  grid-template-columns: 100px auto;
  gap: var(--gap);
}
.a-img{
  padding: var(--padding);
}
</style>