<template>
<div>
  <drawer-bottom-m 
    :show="drawerVisible" 
    @close="hideDrawer()"
    :confirmClose="!isAuthenticated"
    v-if="$device.isMobile"
  >
    <change-selected-address 
      :addresses="addresses" 
      :selectedAddress="selectedAddress" 
      :isAuthenticated="isAuthenticated"
      :title="billingAddress ? $t('billingAddress') : $t('shippingAddress') "
      @select="select"
    />
  </drawer-bottom-m>
  <pop-up
    :show="drawerVisible" 
    @close="hideDrawer()"
    :confirmClose="!isAuthenticated"
    width="480px" 
    height="600px"
    v-if="!$device.isMobile"
  >
    <change-selected-address 
      :addresses="addresses" 
      :selectedAddress="selectedAddress" 
      :isAuthenticated="isAuthenticated"
      :title="billingAddress ? $t('billingAddress') : $t('shippingAddress') "
      @select="select"
    />
  </pop-up>

  <div v-if="!selectedAddress">
    <icon-button :caption="addresses.length ? $t('selectAddress') : $t('addAddress')" @click="showDrawer()">
      <add-icon height=24 color="var(--c-gray-1)" />
    </icon-button>
  </div>
  <div v-else>
    <address-info :address="selectedAddress" @click="showDrawer()"/>
  </div>
</div>
</template>

<script lang="ts">

import UpdateAddressPage from '~/components/pages/profile/UpdateAddressPage.vue'
import AddressInfo from '~/components/pages/profile/AddressInfo.vue'
import AddIcon from '~/components/icons/basic/AddIcon.vue'
import IconButton from '~/components/layout/buttons/IconButton.vue'
import DrawerBottomM from '~/components/layout/drawer/DrawerBottomM.vue'
import ChangeSelectedAddress from '~/components/pages/checkout/ChangeSelectedAddress.vue'
import PopUp from '~/components/layout/misc/PopUp.vue'

export default {
  components: { ChangeSelectedAddress, AddressInfo, AddIcon, IconButton, UpdateAddressPage, DrawerBottomM, PopUp },
  model: {
    prop: 'selectedAddress',
    event: 'select'
  },
  props: {
    isAuthenticated: Boolean,
    billingAddress: Boolean,
    addresses: Array,
    selectedAddress: Object,
  },
  fetchOnServer: false,
  data(){
    return {
      drawerVisible: false
    }
  },
  created(){

    if(this.addresses.length){

      if((this.billingAddress && this.$store.state.checkout.shippingInfo.billingAddress) 
        || (!this.billingAddress && this.$store.state.checkout.shippingInfo.shippingAddress)){
        
        return;
      }

      const selectedAddress = this.addresses.find((a: any) => {
        return this.billingAddress ? a.defaultBillingAddress : a.defaultShippingAddress
      })

      if(selectedAddress){
        this.$emit('select', selectedAddress)
      }
    }
  },
  methods: {
    showDrawer(){
      this.drawerVisible = true
    },
    hideDrawer(){
      this.drawerVisible = false
    },
    select(address){
      this.drawerVisible = false
      this.$emit('select', address)
    }
  }
}
</script>