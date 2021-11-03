<template>
  <lazy-wrapper>
    <portal to="body">
      <drawer-bottom-m v-if="$device.isMobile" :show="updateAddressDrawerVisible" @close="hideUpdateAddressDrawer()" confirmClose>
        <update-address-page 
          @close="addressUpdatedHandle()" 
          :initAddress="selectedAddress"
        />
      </drawer-bottom-m>
      <pop-up v-if="!$device.isMobile" :show="updateAddressDrawerVisible" @close="hideUpdateAddressDrawer()" confirmClose width="480px" height="600px">
        <update-address-page 
          @close="addressUpdatedHandle()" 
          :initAddress="selectedAddress"
        />
      </pop-up>
    </portal>
    <div class="mb2">
      <div v-if="!addresses.length">
        {{ $t('noAddresses') }}
      </div>
      <div v-else class="a-addresses">
        <address-info v-for="(address, i) in computedAddresses" :key="i" :address="address" @click="editAddress(address)" />
      </div>
    </div>
    <div v-if="addresses.length > 3" class="mb2">
      <span class="link-h4" @click="clickHandler(toggleShowMoreAddresses)">{{ showMoreAddresses ? $t('showLess') : $t('showAll') }}</span>
    </div>

    <icon-button :caption="$t('addAddress')" @click="showUpdateAddressDrawer()">
      <add-icon height=24 color="var(--c-gray-1)"/>
    </icon-button>

  </lazy-wrapper>
</template>

<script>
import instanceHandler from '~/core/instanceHandler'
import { LoadingState } from '~/types'
import IconButton from '~/components/layout/buttons/IconButton.vue'
import AddIcon from '~/components/icons/basic/AddIcon.vue'
import DrawerBottomM from '~/components/layout/drawer/DrawerBottomM.vue'
import UpdateAddressPage from './UpdateAddressPage.vue'
import LazyWrapper from '~/components/util/LazyWrapper.vue'
import { getIdToken } from '~/util/auth'
import AddressInfo from './AddressInfo.vue'
import PopUp from '~/components/layout/misc/PopUp.vue'
import clickHandler from '~/util/clickHandler'

export default {
  components: { IconButton, DrawerBottomM, UpdateAddressPage, LazyWrapper, AddressInfo, AddIcon, PopUp },
  fetchOnServer: false,
  async fetch(){

    this.$store.commit("loadingState/isLoading")

    const idToken = await getIdToken()

    const r = await instanceHandler({
      path: "getUserAddresses",
      args: { idToken },
    })

    this.$store.commit("loadingState/isReady")

    if(r.loadingState == LoadingState.error){
      this.$store.dispatch("notifications/error", this.$t('error'))
      return;
    }

    this.addresses = r.data.addresses || []
  },
  computed: {
    sortedAddresses(){
      return this.addresses.sort((a, b) => b.defaultShippingAddress || b.defaultBillingAddress)
    },
    computedAddresses(){
      if(this.showMoreAddresses)
        return this.sortedAddresses
      else
        return this.sortedAddresses.slice(0, 3)
    }
  },
  data(){
    return {
      addresses: [],
      updateAddressDrawerVisible: false,
      selectedAddress: null,
      showMoreAddresses: false
    }
  },
  methods: {
    hideUpdateAddressDrawer(){
      this.updateAddressDrawerVisible = false
      this.selectedAddress = null
    },
    showUpdateAddressDrawer(){
      this.updateAddressDrawerVisible = true
    },
    addressUpdatedHandle(){
      this.hideUpdateAddressDrawer()
      this.$fetch()
    },
    editAddress(address){
      this.selectedAddress = address
      this.updateAddressDrawerVisible = true
    },
    toggleShowMoreAddresses(){
      this.showMoreAddresses = !this.showMoreAddresses
    },
    clickHandler
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