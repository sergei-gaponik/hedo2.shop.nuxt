<template>
<div>
  <drawer-bottom-m 
    :show="show" 
    @close="$emit('close')"
    v-if="$device.isMobile"
  >
    <change-selected-address 
      :addresses="addresses" 
      :selectedAddress="selectedAddress" 
      :title="billingAddress ? $t('billingAddress') : $t('shippingAddress') "
      @select="select"
    />
  </drawer-bottom-m>
  <pop-up
    :show="show" 
    @close="$emit('close')"
    width="480px" 
    height="600px"
    v-if="!$device.isMobile"
  >
    <change-selected-address 
      :addresses="addresses" 
      :selectedAddress="selectedAddress" 
      :title="billingAddress ? $t('billingAddress') : $t('shippingAddress') "
      @select="select"
    />
  </pop-up>
</div>
</template>

<script lang="ts">

import UpdateAddressPage from '~/components/pages/profile/UpdateAddressPage.vue'
import DrawerBottomM from '~/components/layout/drawer/DrawerBottomM.vue'
import ChangeSelectedAddress from '~/components/pages/checkout/ChangeSelectedAddress.vue'
import PopUp from '~/components/layout/misc/PopUp.vue'

export default {
  components: { ChangeSelectedAddress, UpdateAddressPage, DrawerBottomM, PopUp },
  props: {
    billingAddress: Boolean,
    addresses: Array,
    selectedAddress: Object,
    show: Boolean
  },
  fetchOnServer: false,
  methods: {
    select(address){
      this.$emit('select', address)
      this.$emit('close')
    }
  }
}
</script>