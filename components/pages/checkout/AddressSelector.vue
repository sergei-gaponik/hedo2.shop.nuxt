<template>
  <div v-if="!selectedAddress">
    <icon-button :caption="addresses.length ? $t('selectAddress') : $t('addAddress')" @click="$emit('showDrawer')">
      <add-icon height=24 color="var(--c-gray-1)" />
    </icon-button>
  </div>
  <address-info v-else :address="selectedAddress" @click="$emit('showDrawer')"/>
</template>

<script lang="ts">

import AddressInfo from '~/components/pages/profile/AddressInfo.vue'
import AddIcon from '~/components/icons/basic/AddIcon.vue'
import IconButton from '~/components/layout/buttons/IconButton.vue'

export default {
  components: { AddressInfo, AddIcon, IconButton },
  props: {
    selectedAddress: Object,
  }
}
</script>