<template> 
  <lazy-wrapper>
    <div :class="$device.isMobile ? 'container-m' : 'container td-split'">
      <div>
        <h2>{{ $t('shippingAddress') }}</h2>
        <div class="mb4">
          <address-selector 
            :isAuthenticated="isAuthenticated"
            :addresses="addresses"
            :selectedAddress="shippingInfo.shippingAddress"
            @select="v => setShippingInfo('shippingAddress', v)"
          />
        </div>
        <h2>{{ $t('billingAddress') }}</h2>
        <div class="mb4">
          <check-box 
            center
            :checked="shippingInfo.billingAddressMatchesShippingAddress"
            @input="v => setShippingInfo('billingAddressMatchesShippingAddress', v)"
          >
            {{ $t('matchesShippingAddress') }}
          </check-box>
          <address-selector 
            billingAddress
            v-if="!shippingInfo.billingAddressMatchesShippingAddress" 
            :isAuthenticated="isAuthenticated"
            :addresses="addresses"
            :selectedAddress="shippingInfo.billingAddress"
            @select="v => setShippingInfo('billingAddress', v)"
          />
        </div>
      </div>
      <div>
        <h2>{{ $t('deliveryMethod') }}</h2>
        <shipping-methods 
          :shippingMethods="shippingMethods" 
          :subTotal="subTotal" 
          :value="shippingInfo.shippingMethod._id"
          @input="v => setShippingInfo('shippingMethod', v)"
        />
        <div :class="$device.isMobile ? 'main-button-m' : 'mt4'">
          <main-button :disabled="!isValid" @click="nextStep()">{{ $t('nextStep') }}</main-button>
        </div>
        <div v-if="$device.isMobile" class="a-mb"></div>
      </div>
    </div>
  </lazy-wrapper>
</template>

<script>
import auth from '~/core/auth'
import CheckBox from '~/components/layout/inputs/CheckBox.vue'
import AddressSelector from './AddressSelector.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import { getIdToken } from '~/util/auth'
import instanceHandler from '~/core/instanceHandler'
import { LoadingState } from '~/types'
import MainButton from '~/components/layout/buttons/MainButton.vue'
import ShippingMethods from './ShippingMethods.vue'

export default {
  components: { AddressSelector, CheckBox, LazyWrapper, MainButton, ShippingMethods },
  data(){
    return {
      isAuthenticated: false,
      shippingMethods: [],
      addresses: []
    }
  },
  fetchOnServer: false,
  methods: {
    nextStep(){

    }
  },
  computed: {
    lineItems(){
      return this.$store.state.cart.lineItems
    },
    shippingInfo(){
      return this.$store.state.checkout.shippingInfo
    },
    isValid(){
      if(this.shippingInfo.billingAddressMatchesShippingAddress)
        return !!this.shippingInfo?.shippingAddress
      else
        return this.shippingInfo?.shippingAddress && this.shippingInfo?.billingAddress
    },
    subTotal(){
      return this.lineItems.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0)
    }
  },
  methods: {
    nextStep(){
      this.$emit("nextStep")
    },
    setShippingInfo(attribute, value){
      this.$store.commit("checkout/setShippingInfo", [ attribute, value ])
    },

    getPrice(shippingMethod){
      if(shippingMethod.freeShippingMin != null && shippingMethod.freeShippingMin < this.subTotal)
        return 0
      else 
        return shippingMethod.price
    },
    getDefaultShippingMethod(shippingMethods){
      let lowestPrice = Number.MAX_VALUE

      for(const shippingMethod of shippingMethods){
        const price = this.getPrice(shippingMethod)

        if(price < lowestPrice) lowestPrice = price
      }

      const cheapest = shippingMethods.filter(a => this.getPrice(a) == lowestPrice)

      if(cheapest.length == 1)
        return cheapest[0]
      else
        return cheapest.sort((a, b) => a.deliveryTimeTo - b.deliveryTimeTo)[0]
    }
  },
  async fetch(){

    this.$store.commit("loadingState/isLoading")

    try{
      await auth().currentAuthenticatedUser()
      this.isAuthenticated = true
    }
    catch(e){

    }

    if(this.isAuthenticated){
      const idToken = await getIdToken()

      const r = await instanceHandler({
        bulk: [
          {
            path: "getUserAddresses",
            args: { idToken },
            cache: true
          },
          {
            path: "getShippingMethods",
            cache: true
          }
        ]
      })

      this.$store.commit("loadingState/isReady")

      if(r.loadingState == LoadingState.error){
        this.$store.dispatch("notifications/error", this.$t('error'))
        return;
      }

      this.addresses = r.bulk[0].data?.addresses || []
      this.shippingMethods = r.bulk[1].data?.shippingMethods || []

      if(!this.shippingInfo.billingAddressMatchesShippingAddress)
        this.setShippingInfo('billingAddressMatchesShippingAddress', !this.addresses.find(a => a.defaultBillingAddress))
    }
    else{
      const r = await instanceHandler({ path: "getShippingMethods" })

      this.shippingMethods = r.data?.shippingMethods || []
    }
    const shippingMethod = this.getDefaultShippingMethod(this.shippingMethods)

    if(this.shippingInfo.shippingMethod != {})
      this.setShippingInfo('shippingMethod', shippingMethod)

    this.$store.commit("loadingState/isReady")
  },
}
</script>

<style scoped>
.a-nextstep{
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.a-mb{
  margin-bottom: calc(var(--gap) + var(--button-y));
}
</style>