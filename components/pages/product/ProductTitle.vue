<template>
<div :style='{ fontSize: fontSize + "rem", textAlign: center ? "center" : "left" }'>
  
  <div class="a-info-wrapper">
    <div class="text a-info a-outofstock" v-if="outOfStock">{{ $t("outOfStock") }}</div> 
    <div class="text a-info" v-else-if="specialOffer">{{ $t("sale") }}</div> 
  </div>
  <div class="text a-brand">{{ product.brand.name }}</div>
  <div class="text a-title">
    <span class="bold">{{ product.series ? product.series.name : "" }}</span>
    <span>{{ product.name }}</span>
  </div>
  <div :class="['a-variants', center ? 'a-variants-center' : '']">
    <tag v-for="(caption, i) in variantCaptions" :caption="caption" :key="i" />
  </div>
  <div class="text a-price">
    <span class="bold">{{ priceCaption }}</span>
    <span v-if="freeShipping">{{ $t("freeShipping") }}</span>
    <span v-else>{{ $t("excludingShipping") }}</span>
  </div>
  <unit-price :variant="cheapestVariant" />
</div>
</template>

<script>
import Tag from '~/components/layout/misc/Tag.vue'
import UnitPrice from './UnitPrice.vue'

export default {
  components: { Tag, UnitPrice },
  props: { 
    product: Object,
    center: Boolean,
    fontSize: Number,
  },
  computed: {
    outOfStock(){
      return this.product.variants.every(a => a.availableQuantity <= 0)
    },
    specialOffer(){
      return true;
    },
    cheapestVariant(){

      if(this.product.variants.length == 1)
        return this.product.variants[0]

      let min = null
      let _i;
      for(let i = 0; i < this.product.variants.length; i++){
        if(!min || (this.product.variants[i].price && this.product.variants[i].price )){
          min = this.product.variants[i].price
          _i = i
        }
      }

      return this.product.variants[_i]
    },
    priceCaption(){
      return `${this.cheapestVariant.price.toLocaleString(this.$i18n.localeProperties.numberFormat, { style:'currency', currency: this.$i18n.localeProperties.currency })}`
    },
    freeShipping(){
      return true;
    },
    variantCaptions(){
      return this.product.variants.filter(a => a.title).map(a => a.title)
    }
  }
}
</script>

<style scoped>
.a-variants{
  height: 30px;
  display: flex;
  align-items: center;
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
  padding: 0 0.6em 0.2em 0.6em;
  border: 0.1em solid var(--c-brown-1);
  font-size: 0.8em;
  text-transform: uppercase;
  white-space: nowrap;
  letter-spacing: var(--letter-spacing);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.a-outofstock{
  border-color: var(--c-gray-2);
  color: var(--c-gray-2);
}
.a-title {
  height: 2.9em;
  overflow: hidden;
  color: var(--c-green-1);
  font-size: 1em;
  line-height: 1.5em;
}

.a-brand {
  letter-spacing: 0.1em;
  font-size: 1.1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.5em;
}

.a-price {
  letter-spacing: 0.1em;
  font-size: 1em;
  line-height: 1.5em;
}
</style>