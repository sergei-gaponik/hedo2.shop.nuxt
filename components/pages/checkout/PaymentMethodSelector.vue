<template>
  <div class="flex-v">
    <div 
      v-for="paymentMethod in paymentMethods"
      :key="paymentMethod.key"
      :class="['a-item', value == paymentMethod.key ? 'a-item-selected' : '']"
      @click="$emit('input', paymentMethod.key)"
    >
      <div class="a-caption">
        <radio-button 
          :value="paymentMethod.key"
          :curValue="value"
          @input="val => $emit('input', val)"
          center
        >
          <div>{{ paymentMethod.title }}</div>
        </radio-button>
      </div>
      <div class="a-icons">
        <american-express-icon height=24 v-if="paymentMethod.key == 'creditcard'" />
        <klarna-icon height=24 v-if="paymentMethod.key == 'sofort' || paymentMethod.key == 'paylater'" />
        <mastercard-icon height=24 v-if="paymentMethod.key == 'creditcard'" />
        <visa-icon height=24 v-if="paymentMethod.key == 'creditcard'" />
        <sofort-icon height=24 v-if="paymentMethod.key == 'sofort'" />

        <!-- <apple-pay-icon height=24 v-if="paymentMethod.key == 'creditcard'" />
        <google-pay-icon height=24 v-if="paymentMethod.key == 'creditcard'" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import AmazonPayIcon from '~/components/icons/payment/AmazonPayIcon.vue'
import AmericanExpressIcon from '~/components/icons/payment/AmericanExpressIcon.vue'
import ApplePayIcon from '~/components/icons/payment/ApplePayIcon.vue'
import GooglePayIcon from '~/components/icons/payment/GooglePayIcon.vue'
import KlarnaIcon from '~/components/icons/payment/KlarnaIcon.vue'
import MastercardIcon from '~/components/icons/payment/MastercardIcon.vue'
import PayPalIcon from '~/components/icons/payment/PayPalIcon.vue'
import VisaIcon from '~/components/icons/payment/VisaIcon.vue'
import RadioButton from '~/components/layout/inputs/RadioButton.vue'
import SofortIcon from '~/components/icons/payment/SofortIcon.vue'
import { PaymentMethod } from '~/types'

export default {
  components: { SofortIcon, RadioButton, AmazonPayIcon, AmericanExpressIcon, ApplePayIcon, GooglePayIcon, KlarnaIcon, MastercardIcon, PayPalIcon, VisaIcon },
  model: {
    prop: "value",
    event: "input"
  },
  props: { 
    value: String,
  },
  data(){
    const paymentMethods = [
      {
        key: PaymentMethod.creditcard,
        title: this.$t('creditCard')
      },
      {
        key: PaymentMethod.paylater,
        title: this.$t('payLater')
      },
      {
        key: PaymentMethod.sofort,
        title: this.$t('directPayment')
      }
    ]

    return {
      paymentMethods
    }
  }
}
</script>

<style scoped>
.a-item{
  display: grid;
  grid-template-columns: 3fr 2fr;
  user-select: none;
  width: calc(100% - var(--padding) * 2);
  border-radius: var(--default-border-radius);
  padding: var(--padding);
  border: 1px solid white;
}
.a-item-selected{
  border-color: var(--c-gray-3);
}
.a-icons{
  display: flex;
  justify-content: right;
  flex-wrap: wrap;
  gap: var(--gap-s);
}
.a-caption{
  display: flex;
  align-items: center;
  line-height: 1.5rem;
}
</style>