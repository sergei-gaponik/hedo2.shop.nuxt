<template>
  <div class="container-m" v-if="page == 'select'">
    <div class="mb2">
      <h2>{{ $t('selectAddress') }}</h2>
      <div v-if="!addresses.length">
        {{ $t('noAddresses') }}
      </div>
      <div v-else class="a-addresses">
        <address-info 
          v-for="(address, i) in sortedAddresses" 
          :key="i" 
          :address="address" 
          @click="$emit('select', address)"
          hideIcon
          :selectedIcon="selectedAddress && i == 0"
        />
      </div>
    </div>

    <icon-button :caption="$t('addAddress')" @click="setPage('create')">
      <add-icon height=24 color="var(--c-gray-1)"/>
    </icon-button>
  </div>
  <update-address-page
    v-else-if="page == 'create'"
    :initAddress="selectedAddress"
    :guestCheckout="!isAuthenticated" 
    :title="title"
    @submit="addressCreated"
  />
</template>

<script>
import UpdateAddressPage from '~/components/pages/profile/UpdateAddressPage.vue'
import AddressInfo from '~/components/pages/profile/AddressInfo.vue'
import AddIcon from '~/components/icons/basic/AddIcon.vue'
import IconButton from '~/components/layout/buttons/IconButton.vue'

export default {
  components: { AddressInfo, AddIcon, IconButton, UpdateAddressPage },
  props: {
    addresses: Array,
    selectedAddress: Object,
    isAuthenticated: Boolean,
    title: String
  },
  computed: {
    sortedAddresses(){
      if(this.selectedAddress)
        return this.addresses.sort((a, b) => this.selectedAddress.hash == b.hash)
      else
        return this.addresses
    }
  },
  data(){
    return {
      page: this.isAuthenticated ? 'select' : 'create'
    }
  },
  methods: {
    setPage(page){
      this.page = page
    },
    addressCreated(_address){
      this.$emit('select', _address)
    }
  }
}
</script>

<style scoped>
.a-addresses{
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
</style>