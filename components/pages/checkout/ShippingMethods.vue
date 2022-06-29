<template>
  <div class="flex-v">
    <div 
      v-for="shippingMethod in shippingMethods"
      :key="shippingMethod._id"
      :class="['a-item', value == shippingMethod._id ? 'a-item-selected' : '']"
      @click="$emit('input', shippingMethod)"
    >
      <div>
        <radio-button 
          :value="shippingMethod._id"
          :curValue="value"
          @input="$emit('input', shippingMethod)"
          center
        >
          <div>{{ shippingMethod.name }}</div>
          <div class="subdued bold mb">{{ shippingMethod.serviceProvider }}</div>
          <div class="subdued" v-html="getDeliveryTimeLabel(shippingMethod)"/>
        </radio-button>
      </div>
      <div class="price">
        {{ priceCaption(shippingMethod) }}
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from '~/components/layout/inputs/RadioButton.vue'
import { GLOBAL } from '~/core/const'
import { toMoney } from '~/util/money'

export default {
  components: { RadioButton },
  model: {
    prop: "value",
    event: "input"
  },
  props: { 
    shippingMethods: Array,
    value: String,
    subTotal: Number
  },
  methods: {
    priceCaption(shippingMethod){

      const price = this.getPrice(shippingMethod)

      if(price == 0){
        return this.$t('free')
      }

      return toMoney(price, this)
    },
    getPrice(shippingMethod){
      if(shippingMethod.freeShippingMin != null && shippingMethod.freeShippingMin < this.subTotal)
        return 0
      else 
        return shippingMethod.price
    },
    getDeliveryTimeLabel(shippingMethod){

      if(shippingMethod.deliveryTimeFrom != shippingMethod.deliveryTimeTo){
        return `${this.$t("deliveryTime")}: ${shippingMethod.deliveryTimeFrom} - ${shippingMethod.deliveryTimeTo} ${this.$t("days")}`
      }
      else{
        const addDays = new Date().getHours() < GLOBAL.shippingHour ? 0 : 1
        const arrivalDate = new Date(Date.now() + 86400000 * (shippingMethod.deliveryTimeTo + addDays))

        if(shippingMethod.deliveryTimeTo == 1 && !addDays){

          const options = { weekday: 'long', month: 'numeric', day: 'numeric' }
  
          return `${this.$t('arrival')}: <b>${this.$t('tomorrow')}</b> (${arrivalDate.toLocaleDateString(this.$i18n.localeProperties.numberFormat, options)})`
        }
        else{

          const options = { weekday: 'long', month: 'numeric', day: 'numeric' }
  
          return `${this.$t('arrival')}: ${arrivalDate.toLocaleDateString(this.$i18n.localeProperties.numberFormat, options)}`
        }
      }
    }
  }
}
</script>

<style scoped>
.a-item{
  display: flex;
  user-select: none;
  width: calc(100% - var(--padding) * 2);
  justify-content: space-between;
  border-radius: var(--default-border-radius);
  padding: var(--padding);
  border: 1px solid white;
}
.a-item-selected{
  border-color: var(--c-gray-3);
}
</style>