<template>
  <span class="a-unitprice">{{ unitPriceCaption }}</span>
</template>

<script>
export default {
  props: [ "variant", "price" ],
  computed: {
    unitPriceCaption(){

      const kilo = unit => {
        switch(unit){
          case "mL":
            return "L"
          case "g":
            return "kg"
          case "mg":
            return "g"
        }
      }

      const money = f => f.toLocaleString(this.$i18n.localeProperties.numberFormat, { style:'currency', currency: this.$i18n.localeProperties.currency })

      const measurementQuantity = this.variant.measurementQuantity
      const measurementUnit = this.variant.measurementUnit
      const price = this.price || this.variant.price
   
      
      if(!measurementQuantity || !measurementUnit)
        return ""

      const measurementReferenceValue = measurementQuantity > 250 ? 1000 : 100

      const referenceUnit = measurementReferenceValue == 1000 ? kilo(measurementUnit) : measurementUnit
      const referenceCaption = measurementReferenceValue == 1000 ? 1 : 100 + " " + referenceUnit

      const unitPrice = Math.round((price * measurementReferenceValue / measurementQuantity) * 100)  / 100

      return `${money(unitPrice)} / ${referenceCaption}`
    },
  }
}
</script>

<style scoped>
.a-unitprice{
  color: var(--c-gray-2);
  letter-spacing: 0.1em;
  font-size: 0.8em;
  line-height: 1.5em;
  font-weight: normal;
}
</style>