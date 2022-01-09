<template>
<client-only>
  <div>
    <checkout-progress @setStep="setStep" />
    <checkout-step-1 v-if="$store.state.checkout.step == 1" @nextStep="setStep(2)"/>
    <checkout-step-2 v-if="$store.state.checkout.step == 2" @nextStep="setStep(3)" />
    <checkout-step-3 v-if="$store.state.checkout.step == 3" @nextStep="setStep(4)" />
    <checkout-step-4 v-if="$store.state.checkout.step == 4" :isAuthenticated="isAuthenticated" />
  </div>
</client-only>
</template>

<script lang="ts">
import CheckoutStep1 from './CheckoutStep1.vue'
import CheckoutStep2 from './CheckoutStep2.vue'
import CheckoutStep3 from './CheckoutStep3.vue'
import CheckoutStep4 from './CheckoutStep4.vue'
import CheckoutProgress from './CheckoutProgress.vue'
import auth from '~/core/auth'

export default {
  components: { CheckoutStep1, CheckoutStep2, CheckoutStep3, CheckoutStep4, CheckoutProgress },
  data(){
    return {
      isAuthenticated: false,
      lineItems: [],
      ready: false
    }
  },
  methods: {
    setStep(step){
      if(this.isAuthenticated && step < 3) return;

      this.$store.commit('checkout/setStep', step)
    }
  },
  async created(){

    if(!process.client) return;

    this.$store.commit("cart/init")
    this.$store.commit("checkout/init")

    try{
      await auth().currentAuthenticatedUser()
      this.isAuthenticated = true

      if(this.$store.state.checkout.step <= 1)
        this.$store.commit('checkout/setStep', 2)
    }
    catch(e){
    }

    this.ready = true
  }
}
</script>

<style scoped>
.a-td{
  display: grid;
  gap: calc(var(--padding-x-td) * 2);
  grid-template-columns: repeat(2, calc(50% - var(--padding-x-td)));
}
.a-newcustomer-td{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>