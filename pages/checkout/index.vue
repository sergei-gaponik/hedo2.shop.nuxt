<template>
  <div :class="$device.isMobile ? 'container-m' : 'container'">
    <checkout-page />
  </div>
</template>

<script>
import CheckoutPage from '~/components/pages/checkout/CheckoutPage.vue'

export default {
  components: { CheckoutPage }
}
</script>

<style scoped>

</style>