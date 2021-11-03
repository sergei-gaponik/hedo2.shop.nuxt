<template>
  <div :class="$device.isMobile ? 'container-m' : 'container td-split'">
    <div :class="$device.isMobile ? '' : 'td-split-sticky'">
      <order-summery-1 :isAuthenticated="isAuthenticated"/>
      <h2>{{ $t('paymentMethod') }}</h2>
      <payment-methods 
        class="mb4"
        :value="paymentInfo.paymentMethod"
        @input="v => setPaymentInfo('paymentMethod', v)"
      />
    </div>
    <div :class="$device.isMobile ? '' : 'td-split-sticky'">
      <h2>{{ $t('orderSummery') }}</h2>
      <order-summery-2 />
      <div :class="$device.isMobile ? 'main-button-m' : 'mt4'">
        <main-button :disabled="!isValid" @click="nextStep()">{{ $t('goToPaymentProvider') }}</main-button>
      </div>
      <div v-if="$device.isMobile" class="a-mb"></div>
    </div>
  </div>
</template>

<script>
import MainButton from '~/components/layout/buttons/MainButton.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import PaymentMethods from './PaymentMethods.vue'
import OrderSummery1 from './OrderSummery1.vue'
import OrderSummery2 from './OrderSummery2.vue'

export default {
  props: {
    isAuthenticated: Boolean
  },
  components: { MainButton, LazyWrapper, PaymentMethods, OrderSummery1, OrderSummery2 },
  computed: {
    paymentInfo(){
      return this.$store.state.checkout.paymentInfo
    },
    isValid(){
      return true
    }
  },
  methods: {
    setPaymentInfo(attribute, value){
      this.$store.commit("checkout/setPaymentInfo", [ attribute, value ])
    },
    nextStep(){
      
    }
  },
  data(){
    return {
      
    }
  }
}
</script>

<style scoped>
.a-mb{
  margin-bottom: calc(var(--gap) + var(--button-y));
}
</style>