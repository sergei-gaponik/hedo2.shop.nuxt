<template> 
  <lazy-wrapper>
    <div :class="$device.isMobile ? 'container-m' : 'container-slim-d td-split'">
      <div :class="$device.isMobile ? '' : 'td-split-sticky'">
        <h2>{{ $t('shippingAddress') }}</h2>
        <update-address-page
          autoComplete
          guestCheckout
          ref="guestCheckoutShippingAddress"
          noContainer
          hideSubmit
          hideTitle
          initFromStore
          @submit="v => setShippingInfo('shippingAddress', v)"
        />
        <div v-if="$device.isMobile" class="mb4"></div>
      </div>
      <div :class="$device.isMobile ? '' : 'td-split-sticky'">
        <div>
          <h2>{{ $t('billingAddress') }}</h2>
          <div class="mb4">
            <check-box 
              center
              :checked="shippingInfo.billingAddressMatchesShippingAddress"
              @input="v => setShippingInfo('billingAddressMatchesShippingAddress', v)"
            >
              {{ $t('matchesShippingAddress') }}
            </check-box>
            <div v-if="!shippingInfo.billingAddressMatchesShippingAddress" >
              <update-address-page
                autoComplete
                guestCheckout
                ref="guestCheckoutBillingAddress"
                billingAddress
                hideSubmit
                noContainer
                hideTitle
                initFromStore
                @submit="v => setShippingInfo('billingAddress', v)"
              />
            </div>
          </div>
        </div>
        <h2>{{ $t('deliveryMethod') }}</h2>
        <shipping-methods 
          :shippingMethods="shippingMethods" 
          :subTotal="subTotal" 
          :value="shippingInfo.shippingMethod._id"
          @input="v => setShippingInfo('shippingMethod', v)"
        />
        <div :class="$device.isMobile ? 'main-button-m' : 'mt4'">
          <main-button @click="submit()">{{ $t('nextStep') }}</main-button>
        </div>
      </div>
    </div>
  </lazy-wrapper>
</template>

<script>
import CheckBox from '~/components/layout/inputs/CheckBox.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import { getDefaultShippingMethod } from '~/util/checkout'
import instanceHandler from '~/core/instanceHandler'
import MainButton from '~/components/layout/buttons/MainButton.vue'
import ShippingMethods from './ShippingMethods.vue'
import UpdateAddressPage from '~/components/pages/profile/UpdateAddressPage.vue'

export default {
  components: { CheckBox, LazyWrapper, MainButton, ShippingMethods, UpdateAddressPage },
  data(){
    return {
      shippingMethods: [],
      addresses: []
    }
  },
  fetchOnServer: false,
  computed: {
    lineItems(){
      return this.$store.state.cart.lineItems
    },
    shippingInfo(){
      return this.$store.state.checkout.shippingInfo
    },
    isValid(){

      const validAddress = address => address && address.hash && address.firstName && address.lastName && address.zipCode && address.city

      if(this.shippingInfo.billingAddressMatchesShippingAddress)
        return validAddress(this.shippingInfo?.shippingAddress)
      else
        return validAddress(this.shippingInfo?.shippingAddress) && validAddress(this.shippingInfo?.billingAddress)
    },
    subTotal(){
      return this.lineItems.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0)
    }
  },
  methods: {
    submit(){
      this.$refs.guestCheckoutShippingAddress?.$refs.formSubmit.click()
      this.$refs.guestCheckoutBillingAddress?.$refs.formSubmit.click()

      if(this.isValid)
        this.$emit("nextStep")
    },
    setShippingInfo(attribute, value){
      this.$store.commit("checkout/setShippingInfo", [ attribute, value ])
    }
  },
  async fetch(){

    this.$store.commit("loadingState/isLoading")

    const r = await instanceHandler({ path: "getShippingMethods", cache: true })

    this.shippingMethods = r.data?.shippingMethods || []
    
    const shippingMethod = getDefaultShippingMethod(this.shippingMethods, this.subTotal)

    if(this.shippingInfo.shippingMethod != {})
      this.setShippingInfo('shippingMethod', shippingMethod)

    this.$store.commit("loadingState/isReady")
  },
}
</script>