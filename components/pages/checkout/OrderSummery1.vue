<template>
  <div class="mb4">
    <p>{{ $t('contactInformation') }}</p>
    <div :class="isAuthenticated ? 'panel' : 'panel pointer'" @click="!isAuthenticated ? setStep(2) : null">
      {{ contactInfo.email }}
    </div>
    <p>{{ $t('shippingAddress') }}</p>
    <address-info :address="shippingInfo.shippingAddress" hideIcon hideDefault @click="setStep(3)" />
    <p>{{ $t('billingAddress') }}</p>
    <address-info :address="billingAddress" hideIcon hideDefault @click="setStep(3)" />
  </div>
</template>


<script>
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import ProductItem from '~/components/pages/product/ProductItem.vue'
import CartTotal from '~/components/pages/cart/CartTotal.vue'
import AddressInfo from '~/components/pages/profile/AddressInfo.vue'

export default {
  components: { LazyWrapper, ProductItem, CartTotal, AddressInfo },
  props: {
    isAuthenticated: Boolean
  },
  computed: {
    billingAddress(){
      return this.shippingInfo.billingAddressMatchesShippingAddress ? this.shippingInfo.shippingAddress : this.shippingInfo.billingAddress
    },
    shippingInfo(){
      return this.$store.state.checkout.shippingInfo
    },
    contactInfo(){
      return this.$store.state.checkout.contactInfo
    },
  },
  methods: {
    setStep(step){
      this.$store.commit("checkout/setStep", step)
    }
  }
}
</script>

<style scoped>
</style>

