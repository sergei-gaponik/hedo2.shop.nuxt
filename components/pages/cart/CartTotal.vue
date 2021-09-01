<template>
  <div class="a-container">
    <div class="a-line">
      <span>{{ $t("subtotal") }}:</span>
      <span>{{ money(subtotal) }}</span>
    </div>
    <div class="a-line" v-if="discounts > 0">
      <span>{{ $t("discounts") }}:</span>
      <span>{{ `- ${money(discounts)}` }}</span>
    </div>
    <div class="a-line">
      <span>{{ $t("vat") }}:</span>
      <span>{{ money(vat) }}</span>
    </div>
    <div class="a-line">
      <span>{{ $t("shippingCost") }}:</span>
      <span>{{ money(shippingCost) }}</span>
    </div>
    <div class="a-line a-total">
      <span>{{ $t("total") }}:</span>
      <span>{{ money(total) }}</span>
    </div>
  </div>
</template>

<script>
import { GLOBAL } from '~/core/const'

export default {
  props: [ "cartItems" ],
  computed: {
    subtotal(){
      return this.cartItems.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0)
    },
    shippingCost(){
      return this.subtotal >= GLOBAL.freeShippingMin ? 0 : GLOBAL.shippingCost
    },
    vat(){
      return this.subtotal - (this.subtotal / (1 + GLOBAL.vat))
    },
    total(){
      return this.subtotal + this.shippingCost - this.discounts
    },
    discounts(){
      return 0
    }
  },
  methods: {
    money(v){
      return v.toLocaleString(this.$i18n.localeProperties.numberFormat, { style:'currency', currency: this.$i18n.localeProperties.currency } )
    }
  }
}
</script>

<style scoped>
.a-container {
  background-color: var(--c-gray-4);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  padding: var(--padding);
}
.a-line {
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
}
.a-total {
  padding-top: var(--gap);

  font-weight: 600;
  border-top: 1px solid var(--c-gray-3);
}
</style>