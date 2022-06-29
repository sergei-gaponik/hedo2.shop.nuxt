<template>
<div :style='{ fontSize: fontSize + "rem", textAlign: center ? "center" : "left" }'>
  
  <div class="a-info-wrapper" v-if="!hideInfoTag && !infoTagBottom">
    <div class="text a-info a-outofstock" v-if="outOfStock">{{ $t("outOfStock") }}</div> 
    <div class="text a-info" v-else-if="specialOffer">{{ $t("sale") }}</div> 
  </div>
  <div class="text a-brand">{{ product.brand.name }}</div>
  <div class="text product-title">
    <span class="bold">{{ product.series ? product.series.name : "" }}</span>
    <span>{{ product.name }}</span>
  </div>
  <div :class="['a-variants', 'mb', center ? 'a-variants-center' : '']">
    <tag v-for="(caption, i) in variantCaptions" :caption="caption" :key="i" />
    <div v-if="altPriceCaption" class="text bold a-pricecaption">
      {{ altPriceCaption }}
    </div>
  </div>
  <div class="a-info-wrapper a-info-bottom mb" v-if="!hideInfoTag && infoTagBottom && (outOfStock || specialOffer)">
    <div class="text a-info a-outofstock" v-if="outOfStock">{{ $t("outOfStock") }}</div> 
    <div class="text a-info" v-else-if="specialOffer">{{ $t("sale") }}</div> 
  </div>
  <div v-if="!hidePrice">
    <div class="text price">
      <span class="bold">{{ priceCaption }}</span>
      <span v-if="freeShipping">{{ $t("freeShipping") }}</span>
      <span v-else>{{ $t("excludingShipping") }}</span>
    </div>
    <unit-price :variant="cheapestVariant" />
  </div>
</div>
</template>

<script>
import Tag from '~/components/layout/misc/Tag.vue'
import UnitPrice from './UnitPrice.vue'
import { getVariantTag, isSpecialOffer, getCheapestVariant } from '~/util/variants'
import { toMoney } from '~/util/money'

export default {
  components: { Tag, UnitPrice },
  props: { 
    product: Object,
    center: Boolean,
    hideInfoTag: Boolean,
    infoTagBottom: Boolean,
    hidePrice: Boolean,
    customPrice: Number,
    customTag: String,
    fontSize: Number,
    altPriceCaption: String,
    selectedVariant: Object
  },
  computed: {
    outOfStock(){
      return this.product.variants.every(a => a.availableQuantity <= 0)
    },
    specialOffer(){

      if(this.selectedVariant)
        return isSpecialOffer(this.selectedVariant)

      return this.product.variants.some(a => isSpecialOffer(a))
    },
    cheapestVariant(){

      return getCheapestVariant(this.product.variants)
    },
    priceCaption(){
      const price = this.customPrice ? this.customPrice : this.cheapestVariant.price
      return toMoney(price, this)
    },
    freeShipping(){
      return true;
    },
    variantCaptions(){
      if(this.customTag)
        return [ this.customTag ]
      else if(this.customTag == "")
        return []
      else
        return this.product.variants.map(variant => getVariantTag(variant))
    }
  }
}
</script>

<style scoped>
.a-variants{
  height: 30px;
  display: flex;
  align-items: center;
  gap: var(--gap-s);
}
.a-variants-center{
  justify-content: center;
}
.a-info-wrapper{
  position: relative;
  height: 2.2em;
}
.a-info{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: var(--c-brown-1);
  padding: 0 0.6rem 0.2rem 0.6rem;
  border: 0.1em solid var(--c-brown-1-l);
  border-radius: var(--border-radius-2);
  font-size: 0.75rem;
  text-transform: uppercase;
  white-space: nowrap;
  letter-spacing: var(--letter-spacing);
  user-select: none;
}
.a-info-bottom > .a-info{
  left: 0;
  transform: none;
  margin-bottom: 2.2em;
}
.a-outofstock{
  border-color: var(--c-gray-2-l);
  color: var(--c-gray-2);
}

.a-brand {
  letter-spacing: var(--letter-spacing);
  font-size: 1.1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.5em;
}

.a-pricecaption{
  letter-spacing: 0.1em;
  font-size: 1em;
  line-height: 1.5em;
  margin-left: auto;
}
</style>