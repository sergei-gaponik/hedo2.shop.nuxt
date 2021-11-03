<template>
  <div class="a-container panel" @click="$emit('click')">
    <div class="a-info">
      <div>{{ `${address.firstName} ${address.lastName}` }}</div>
      <div>{{ address.addressLine }}</div>
      <div>{{ address.addressLine2 }}</div>
      <div>{{ `${address.zipCode} ${address.city}`  }}</div>
      <div v-if="!hideDefault && (address.defaultShippingAddress || address.defaultBillingAddress)" class="mt2">
        <div class="a-default" v-if="address.defaultShippingAddress">{{ $t('defaultShippingAddress') }}</div>
        <div class="a-default" v-if="address.defaultBillingAddress">{{ $t('defaultBillingAddress') }}</div>
      </div>
    </div>
    <div v-if="!hideIcon">
      <edit-icon height=24 color="var(--c-gray-2)" />
    </div>
    <div v-if="selectedIcon">
      <success-icon height=24 color="var(--c-gray-2)" />
    </div>
  </div>
</template>

<script>
import EditIcon from '~/components/icons/basic/EditIcon.vue'
import SuccessIcon from '~/components/icons/status/SuccessIcon.vue'

export default {
  components: { EditIcon, SuccessIcon },
  props: {
    address: Object,
    hideIcon: Boolean,
    hideDefault: Boolean,
    selectedIcon: Boolean
  }
}
</script>

<style scoped>
.a-container{
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.a-default{
  font-weight: bold;
  color: var(--c-gray-2);
  line-height: 1.5em;
}
</style>