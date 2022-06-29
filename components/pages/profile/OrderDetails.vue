<template>
  <div class="a-overflow">
    <div class="container">
      <h6 class="mb4">
        {{ `${$t('orderNumber')}: ${order.orderNumber}` }}
      </h6>
      <div class="a-items mb2">
        <product-item 
          v-for="lineItem in visibleLineItems"
          :key="lineItem.variant._id"
          :product="lineItem.product"
          :variant="lineItem.variant"
          :price="lineItem.price"
          :quantity="lineItem.quantity"
          @click="$router.push('/p/' + lineItem.product.handle)"
        />
        <show-more 
          v-if="order.lineItems.length > 3"
          class="mt2"
          v-model="showAll"
          :showMoreCaption="$t('showAllNItems').replace('{n}', order.lineItems.length)"
        />
      </div>
      <div :class="$device.isMobile ? 'flex-v mb2' : 'grid-2 mb2'">
        <div>
          <h6>{{ $t('shippingAddress') }}</h6>
          <address-info 
            :address="order.shippingAddress"
            hideIcon
          />
        </div>
        <div>
          <h6>{{ $t('billingAddress') }}</h6>
          <address-info 
            :address="billingAddress"
            hideIcon
          />
        </div>
      </div>
      <cart-total 
        class="mb2"
        :cartItems="order.lineItems"
        :customShippingCost="order.shippingCost"
      />
      <div class="flex-h mb2">
        <info-icon height="24" color="var(--c-gray-2)" />
        <div v-html="$t('orderHelpText')" />
      </div>
      <primary-button @click="trackDelivery()">{{ $t('trackDelivery') }}</primary-button>
    </div>
  </div>
</template>

<script>
import ProductItem from '~/components/pages/product/ProductItem.vue'
import CartTotal from '~/components/pages/cart/CartTotal.vue'
import AddressInfo from '~/components/pages/profile/AddressInfo.vue'
import ShowMore from '~/components/layout/common/ShowMore.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import PrimaryButton from '~/components/layout/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/layout/buttons/SecondaryButton.vue'
import InfoIcon from '~/components/icons/status/InfoIcon.vue'

export default {
  components: { ProductItem, CartTotal, AddressInfo, ShowMore, LazyWrapper, PrimaryButton, SecondaryButton, InfoIcon },
  props: ["order"],
  computed: {
    visibleLineItems(){
      if(this.showAll)
        return this.order.lineItems
      else
        return this.order.lineItems.slice(0, 3)
    },
    billingAddress(){
      if(this.order.billingAddressMatchesShippingAddress)
        return this.order.shippingAddress
      else
        return this.order.billingAddress
    }
  },
  methods: {
    trackDelivery(){

    }
  },
  data(){
    return {
      showAll: false
    }
  }
}
</script>

<style scoped>
.a-overflow{
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}
</style>