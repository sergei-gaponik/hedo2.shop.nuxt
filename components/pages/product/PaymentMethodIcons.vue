<template>
<div v-if="!singleLine">
  <div class="flex-v">
    <div class="flex-h a-center">
      <american-express-icon height=24 />
      <mastercard-icon height=24 />
      <maestro-icon height=24 />
      <visa-icon height=24 />
      <pay-pal-icon height=24 />
    </div>
    <div class="flex-h a-center">
      <klarna-icon height=24 />
      <sofort-icon height=24 />
      <apple-pay-icon height=24 />
      <google-pay-icon height=24 />
    </div>
  </div>
</div>
<div v-else class="flex-h">
  <american-express-icon height=24 />
  <mastercard-icon height=24 />
  <maestro-icon height=24 />
  <visa-icon height=24 />
  <pay-pal-icon height=24 />
  <klarna-icon height=24 />
  <sofort-icon height=24 />
  <apple-pay-icon height=24 />
  <google-pay-icon height=24 />
</div>
</template>

<script>
import AmericanExpressIcon from '~/components/icons/payment/AmericanExpressIcon.vue'
import ApplePayIcon from '~/components/icons/payment/ApplePayIcon.vue'
import GooglePayIcon from '~/components/icons/payment/GooglePayIcon.vue'
import KlarnaIcon from '~/components/icons/payment/KlarnaIcon.vue'
import MastercardIcon from '~/components/icons/payment/MastercardIcon.vue'
import PayPalIcon from '~/components/icons/payment/PayPalIcon.vue'
import VisaIcon from '~/components/icons/payment/VisaIcon.vue'
import SofortIcon from '~/components/icons/payment/SofortIcon.vue'
import MaestroIcon from '~/components/icons/payment/MaestroIcon.vue'

export default {
  components: { SofortIcon, MaestroIcon, AmericanExpressIcon, ApplePayIcon, GooglePayIcon, KlarnaIcon, MastercardIcon, PayPalIcon, VisaIcon },
  props: {
    singleLine: Boolean
  }
}
</script>

<style scoped>

.a-center{
  justify-content: center;
}
</style>