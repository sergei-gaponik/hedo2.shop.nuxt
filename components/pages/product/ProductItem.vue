<template>
  <div class="a-product">
    <div class="a-img">
      <product-image :src="image" />
    </div>
    <div @click="$emit('click')" class="pointer">
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
import { getVariantTag } from '~/util/variants' 
import { toMoney } from '~/util/money'

export default {
  components: { ProductImage, ProductTitle },
  props: {
    product: Object,
    variant: Object,
    price: Number,
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
      return toMoney(this.price || this.variant.price, this)
    },
    image(){
      return this.variant.images?.length ? this.variant.images[0].asset.src : this.product.images[0].asset.src
    },
    customTag(){
      return getVariantTag(this.variant)
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