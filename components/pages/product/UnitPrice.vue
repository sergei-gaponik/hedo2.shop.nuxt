<template>
  <span class="a-unitprice">{{ unitPriceCaption }}</span>
</template>

<script>
export default {
  props: [ "variant", "price" ],
  computed: {
    unitPriceCaption(){
   
      const l = f => f == 1 ? "" : f.toLocaleString(this.$i18n.localeProperties.numberFormat)
      const money = f => f.toLocaleString(this.$i18n.localeProperties.numberFormat, { style:'currency', currency: this.$i18n.localeProperties.currency })
      
      if(!this.variant.measurementReferenceValue || !this.variant.measurementQuantity || !this.variant.measurementUnit)
        return ""

      const price = this.price || this.variant.price
      const unitPrice = Math.round((price * this.variant.measurementReferenceValue / this.variant.measurementQuantity) * 100)  / 100

      return `${money(unitPrice)} / ${l(this.variant.measurementReferenceValue) + this.variant.measurementUnit}`
    },
  }
}
</script>

<style scoped>
.a-unitprice{
  color: var(--c-brown-2);
  letter-spacing: 0.1em;
  font-size: 0.8em;
  line-height: 1.5em;
  font-weight: normal;
}
</style>