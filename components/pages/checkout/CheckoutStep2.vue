<template> 
  <lazy-wrapper>
    <div>
      <change-selected-address-drawer 
        :show="!!drawer"
        @close="closeDrawer()"
        :billingAddress="drawer == 'billingAddress'"
        :addresses="addresses"
        :selectedAddress="drawer == 'billingAddress' 
          ? (shippingInfo.billingAddress || null) 
          : (shippingInfo.shippingAddress || null)"
        @select="v => setShippingInfo(drawer, v)"
      />
      <div :class="$device.isMobile ? 'container-m' : 'container-slim-d td-split'">
        <div :class="$device.isMobile ? '' : 'td-split-sticky'">
          <h2>{{ $t('shippingAddress') }}</h2>
          <div>
            <address-selector 
              :selectedAddress="shippingInfo.shippingAddress"
              @showDrawer="showDrawer('shippingAddress')"
            />
          </div>
          <div>
            <h2>{{ $t('billingAddress') }}</h2>
            <check-box 
              v-if="addresses.length == 0"
              center
              :checked="shippingInfo.billingAddressMatchesShippingAddress"
              @input="v => setShippingInfo('billingAddressMatchesShippingAddress', v)"
            >
              {{ $t('matchesShippingAddress') }}
            </check-box>
            <div v-if="!shippingInfo.billingAddressMatchesShippingAddress" >
              <address-selector 
                :selectedAddress="shippingInfo.billingAddress"
                @showDrawer="showDrawer('billingAddress')"
              />
            </div>
          </div>
          <div v-if="$device.isMobile" class="mb4"></div>
        </div>
        <div :class="$device.isMobile ? '' : 'td-split-sticky'">
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
    </div>
  </lazy-wrapper>
</template>

<script>
import CheckBox from '~/components/layout/inputs/CheckBox.vue'
import AddressSelector from './AddressSelector.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import { getIdToken } from '~/util/auth'
import { getDefaultShippingMethod } from '~/util/checkout'
import instanceHandler from '~/core/instanceHandler'
import { LoadingState } from '~/types'
import MainButton from '~/components/layout/buttons/MainButton.vue'
import ShippingMethods from './ShippingMethods.vue'
import ChangeSelectedAddressDrawer from './ChangeSelectedAddressDrawer.vue'

export default {
  components: { AddressSelector, CheckBox, LazyWrapper, MainButton, ShippingMethods, ChangeSelectedAddressDrawer },
  data(){
    return {
      shippingMethods: [],
      addresses: [],
      drawer: null
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
      if(this.shippingInfo.billingAddressMatchesShippingAddress)
        return this.shippingInfo?.shippingAddress
      else
        return this.shippingInfo?.shippingAddress && this.shippingInfo?.billingAddress
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
    },
    showDrawer(drawer){
      this.drawer = drawer
    },
    closeDrawer(){
      this.drawer = null
    }
  },
  async fetch(){

    this.$store.commit("loadingState/isLoading")

    const idToken = await getIdToken()

    const r = await instanceHandler({
      bulk: [
        {
          path: "getUserAddresses",
          args: { idToken },
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

    const shippingAddress = this.addresses.find(a => a.defaultShippingAddress) || this.addresses[0]

    if(!this.shippingInfo.shippingAddress && shippingAddress)
      this.setShippingInfo('shippingAddress', shippingAddress)
    
    const billingAddress = this.addresses.find(a => a.defaultBillingAddress) || this.addresses[0]

    if(!this.shippingInfo.billingAddress && billingAddress)
      this.setShippingInfo('billingAddress', billingAddress)

    if(this.addresses.length >= 1)
      this.setShippingInfo('billingAddressMatchesShippingAddress', false)
      

    const shippingMethod = getDefaultShippingMethod(this.shippingMethods, this.subTotal)

    if(this.shippingInfo.shippingMethod != {})
      this.setShippingInfo('shippingMethod', shippingMethod)

    this.$store.commit("loadingState/isReady")
  },
}
</script>