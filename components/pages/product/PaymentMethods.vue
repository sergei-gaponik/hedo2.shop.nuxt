<template>
  <div class="a-container">
    <h4 class="a-caption">
      {{ $t('payConvenientlyWith') + ":" }}
    </h4>
    <div class="a-paymentmethods">
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
  components: { SofortIcon, MaestroIcon, AmericanExpressIcon, ApplePayIcon, GooglePayIcon, KlarnaIcon, MastercardIcon, PayPalIcon, VisaIcon}
  
}
</script>

<style scoped>
.a-container{
  position: relative;
  width: 100%;
  top: 10px;
}
.a-caption{
  position: absolute;
  background-color: white;
  left: 50%;
  top: -25px;
  transform: translateX(-50%);
  color: var(--c-blue-1);
  z-index: 1;
  padding: 0 var(--padding);
  white-space: nowrap;
}
.a-center{
  justify-content: center;
}
.a-paymentmethods{
  position: relative;
  border-radius: var(--default-border-radius);
  padding: calc(var(--padding) * 2);
  border: var(--border-width) solid var(--c-blue-2);
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}
</style>